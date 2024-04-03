import React, { useEffect, useState } from "react";
import correctImage from "../assets/correct.png";
import deleteImage from "../assets/delete.png";
import moreImage from "../assets/more.png";
import { NavLink } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests

const Card = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [deleted, setDeleted] = useState(false);



  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      console.log(props.book._id);
      await axios.delete(`http://localhost:3000/api/users/${props.book._id}`);
      setDeleted(true);
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  return !deleted ? (
    <div className="flex flex-wrap xl:m-4 lg:m-5 md:m-4 sm:m-5 w-full m-5">
      <div className="relative w-96 bg-white border border-gray-200 rounded-2xl shadow-md dark:bg-gray-950 dark:border-gray-700">
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <div className="relative inline-block text-left">
            <button
              className="inline-flex justify-center w-4 h-4 p- rounded-full bg-gray-950 dark:text-gray-300 shadow-lg"
              onClick={toggleOptions}
            >
              <img src={moreImage} alt="More Options" />
            </button>

            {showOptions && (
              <div className="origin-top-right absolute right-0 mt-0 w-32 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <NavLink
                    to={`/api/users/edit/${props.book._id}`}
                    className="block bg-gray-900 hover:bg-gray-700 px-4 py-2 text-sm text-white w-full rounded-t-md text-left"
                    role="menuitem"
                  >
                    Edit User
                  </NavLink>
                  <button
                    className="block bg-gray-900 px-4 py-2 hover:bg-gray-700 text-sm text-white rounded-b-md w-full text-left"
                    role="menuitem"
                    onClick={handleDeleteUser}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <img
          className="w-6 h-6 rounded-full bg-gray-300 m-2 dark:bg-gray-700 dark:text-gray-300 shadow-lg"
          src={props.book.available ? correctImage : deleteImage}
          alt="availability"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {isHovered && (
          <div className="absolute text-xs bg-gray-900 p-1 text-white rounded-md shadow-lg">
            {props.book.available ? "Available" : "Unavailable"}
          </div>
        )}
        <div className="flex flex-col items-center pb-8 ">
          <div className="flex justify-center items-center">
            <img
              className="w-12 h-12 mb-3 rounded-full shadow-lg"
              src={props.book.avatar}
              alt={props.book.first_name}
            />
            <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
              {props.book.first_name + " " + props.book.last_name}
            </h5>
          </div>
          <span className="text-sm dark:text-gray-500 uppercase">
            {props.book.domain}
          </span>
          <div className="flex mt-4 md:mt-6 flex-col bg-gray-900 px-8 py-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-sm uppercase text-gray-500 mr-2">
                Email:
              </span>
              <span className="text-sm max-w-40 text-white overflow-hidden whitespace-nowrap overflow-ellipsis">
                {props.book.email}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm uppercase text-gray-500 mr-2">
                Gender:
              </span>
              <span className="text-sm text-white">{props.book.gender}</span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};


export default Card;


