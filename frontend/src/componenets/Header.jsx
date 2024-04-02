import React from "react";
import { NavLink } from "react-router-dom";
import partnerImage from '../assets/partners.png'
const Header = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container flex justify-between items-center overflow-x-auto mx-auto">
        <div className="flex items-center overflow-x-auto">
          <img
            src={partnerImage}
            alt="Logo"
            className="h-10"
          />
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="/"
            className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Home
          </a>
          <NavLink
            to="/api/users/add"
            className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Add User
          </NavLink>
          <button className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-900">
            Create Team
          </button>
          <button className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-900">
            View Teams
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
