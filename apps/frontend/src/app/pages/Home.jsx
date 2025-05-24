import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../components/post';
import PostFormModal from '../components/postModal';

const API_BASE_URL = 'http://localhost:8000';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/user/authenticated`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Current user:', response.data);
        setCurrentUser(response.data || null);
      })
      .catch(() => {
        console.log('Authentication check failed');
        setCurrentUser(null);
      });
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/posts/?page=${page}`
      );
      const newPosts = response.data.results;
      setPosts((prev) => [
        ...prev,
        ...newPosts.filter((np) => !prev.some((p) => p.id === np.id)),
      ]);
      if (response.data.next) setPage((prev) => prev + 1);
      else setHasMore(false);
    } catch (error) {
      setError('Failed to load posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = () => {
    setEditingPost(null);
    setModalOpen(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setModalOpen(true);
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios
        .delete(`${API_BASE_URL}/api/posts/${postId}/`, {})
        .then(() => setPosts((prev) => prev.filter((p) => p.id !== postId)))
        .catch(() => alert('Failed to delete post'));
    }
  };

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.image && data.image[0]) formData.append('image', data.image[0]);

    const url = editingPost
      ? `${API_BASE_URL}/api/posts/${editingPost.id}/`
      : `${API_BASE_URL}/api/posts/`;

    const method = editingPost ? 'put' : 'post';

    axios({
      method,
      url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        if (editingPost) {
          setPosts((prev) =>
            prev.map((p) => (p.id === editingPost.id ? response.data : p))
          );
        } else {
          setPosts((prev) => [response.data, ...prev]);
        }
        setModalOpen(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="home-page flex justify-center bg-gray-900 min-h-screen">
      <div className="w-full max-w-2xl">
        {error && <div className="text-red-500 text-center">{error}</div>}
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500">
              {posts.length === 0 ? 'No posts available' : 'No more posts'}
            </p>
          }
        >
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              currentUser={currentUser}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </InfiniteScroll>
      </div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        onClick={handleCreate}
      >
        Create Post
      </button>
      {modalOpen && (
        <PostFormModal
          post={editingPost}
          onSubmit={handleFormSubmit}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default HomePage;
