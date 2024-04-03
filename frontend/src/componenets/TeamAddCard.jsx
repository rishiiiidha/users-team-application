import React, { useState } from "react";
import correctImage from "../assets/correct.png";
import deleteImage from "../assets/delete.png";

const AvailabilityBadge = ({ available }) => (
  <img
    className="absolute top-0 right-0 w-6 h-6 mt-2 mr-2 rounded-full bg-gray-300 dark:bg-gray-700 dark:text-gray-300 shadow-lg"
    src={available ? correctImage : deleteImage}
    alt={available ? "Available" : "Unavailable"}
  />
);

const TeamAddCard = ({ book, team, handleTeam }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { first_name, last_name, domain, email, gender, available } = book;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleAddToTeam = () => handleTeam([...team, book._id]);

  return (
    <div className="w-4/5 m-5">
      <div className="relative bg-white border border-gray-200 rounded-2xl shadow-md dark:bg-gray-950 dark:border-gray-700">
        <AvailabilityBadge available={available} />
        {isHovered && (
          <div className="absolute text-xs bg-gray-900 p-1 text-white rounded-md shadow-lg top-8 right-2">
            {available ? "Available" : "Unavailable"}
          </div>
        )}
        <div className="p-4 flex sm:flex-row flex-col items-center">
          <img
            className="w-12 h-12 rounded-full shadow-lg"
            src={book.avatar}
            alt={`${first_name} ${last_name}`}
          />
          <div className="ml-4 flex-grow">
            <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
              {`${first_name} ${last_name}`}
            </h5>
            <span className="text-sm dark:text-gray-500 uppercase">
              {domain}
            </span>
          </div>
          <div className="ml-4 bg-gray-950 px-4 py-2 rounded-lg flex flex-col items-center">
            <div className="flex items-center mb-1">
              <span className="text-sm uppercase text-gray-500 mr-2">
                Email:
              </span>
              <span className="text-sm sm:max-w-40 w-auto text-white overflow-hidden whitespace-nowrap overflow-ellipsis">
                {email}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm uppercase text-gray-500 mr-2">
                Gender:
              </span>
              <span className="text-sm text-white">{gender}</span>
            </div>
            <button
              className="rounded-lg bg-gray-800 text-white px-4 py-2 m-4"
              onClick={handleAddToTeam}
              disabled={team.includes(book._id)}
            >
              {team.includes(book._id) ? "Added to Team" : "Add to Team"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAddCard;
