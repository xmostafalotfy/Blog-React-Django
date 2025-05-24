import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDropdown from './UserDropdown';

const API_BASE_URL = 'http://localhost:8000';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/user/authenticated`)
      .then((response) => {
        if (response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error('Error checking authentication:', error);
        setUser(null);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/user/logout`);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 shadow-lg">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="TalkPost Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            TalkPost
          </span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {user ? (
            <UserDropdown user={user} handleLogout={handleLogout} />
          ) : (
            <a
              href="/login"
              className="inline-block text-sm font-semibold text-gray-300 transition-all duration-300 
                         hover:text-white hover:bg-blue-700 px-5 py-2 rounded-lg shadow-md ring-1 ring-blue-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
