import React, { useState } from 'react';

function UserDropdown({ user, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const API_BASE_URL = 'http://localhost:8000';

  return (
    <div className="relative">
      {/* Avatar Toggle */}
      <button onClick={toggleDropdown} className="focus:outline-none">
        <img
          src={user.img ? `${API_BASE_URL}${user.img}` : '/default-avatar.png'}
          className="w-8 h-8 rounded-full"
          alt="User avatar"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
          <a
            href="/profile"
            className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
          >
            Profile
          </a>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
