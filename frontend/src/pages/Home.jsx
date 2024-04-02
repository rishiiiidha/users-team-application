import React from "react";
import Card from "../componenets/Card";
import Header from "../componenets/Header";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="flex justify-center items-center flex-col mt-64 w-screen p-4">
        <h1 className="p-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-6xl lg:text-6xl text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-700 from-sky-600">
            Find Users and Build Teams
          </span>
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-200 text-center w-3/4 flex justify-center items-center">
          Welcome to our platform! We focus on creating a
          collaborative environment where individuals can connect across
          different domains to form teams and collaborate effectively. Our goal
          is to facilitate innovation and growth by bringing together diverse
          talents. Start your journey by searching for users from various
          backgrounds and expertise to build your dream team.
        </p>
        <NavLink
          to="/api/users"
          className="inline-flex items-center text-lg text-blue-600 dark:text-blue-500 hover:underline justify-center"
        >
          Search Users
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
