// src/components/Post.js
import React from 'react';

function Post({ post, currentUser, onEdit, onDelete }) {
  return (
    <div className="post bg-gray-700 p-4 rounded-lg mb-4 shadow-md">
      <div className="flex items-center mb-2">
        <img
          src={post.author_image}
          className="w-10 h-10 rounded-full mr-2"
          alt={post.author_username}
        />
        <div>
          <div className="text-white font-bold">
            {post.author_full_name || post.author_username}
          </div>
          <div className="text-gray-400 text-sm">@{post.author_username}</div>
        </div>
        {currentUser && currentUser.id === post.author_id && (
          <div className="ml-auto flex space-x-2">
            <button
              onClick={() => onEdit(post)}
              className="text-blue-400 hover:text-blue-300"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <h2 className="text-xl text-white mb-2">{post.title}</h2>
      <p className="text-gray-300">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          className="mt-2 rounded-lg w-full"
          alt={post.title}
        />
      )}
    </div>
  );
}

export default Post;
