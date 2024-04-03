import React from "react";
import { NavLink } from "react-router-dom";

const Team = () => {
  return (
    <div className="flex justify-center items-center w-screen mt-36">
      <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-1">
        <NavLink to="/api/users/team/create">
          <div className="bg-gray-950 rounded-full overflow-hidden shadow-gray-950 hover:shadow-xl flex justify-center items-center flex-col md:h-80 md:w-80 w-30 h-30">
            <img
              className="w-16 h-16"
              src="https://robohash.org/etvoluptatemoccaecati.png"
              alt="Create Team"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-white">
                Create Teams
              </div>
            </div>
          </div>
        </NavLink>

        <NavLink to="/api/users/team/view">
          <div className="bg-gray-950 rounded-full overflow-hidden shadow-gray-950 hover:shadow-xl flex justify-center items-center flex-col md:h-80 md:w-80 w-30 h-30">
            <img
              className="w-16 h-16"
              src="https://robohash.org/eumdelectusducimus.png"
              alt="View Teams"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-white">
                View Teams
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Team;
