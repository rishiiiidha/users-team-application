import React, { useState, useEffect } from "react";
import Card from "../componenets/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";
import axios from "axios";

const Users = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [totaldata, setTotalData] = useState([]);
  const [selectDomain, setSelectDomain] = useState(false);
  const [domain, setDomain] = useState("");
  const [selectGender, setSelectGender] = useState(false);
  const [gender, setGender] = useState("");
  const [available, setAvailable] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [fetchUsers]);

  const state = useSelector((state) => state);

  useEffect(() => {
    state.user.data && setData(state.user.data.users);
    state.user.data && setTotalData(state.user.data.users);
  }, [state.user.data]);

  const handleSearch = async () => {
    try {
      setSelectDomain(false);
      setSelectGender(false);
      const { data } = await axios.get(
        `https://team-users-application.onrender.com/api/users?name=${name}&&domain=${domain}&&gender=${gender}&&available=${available}`
      );
      console.log(data);
      if (data.users.length === 0) {
        alert("No users found");
        setData(totaldata);
      } else {
        setData(data.users);
      }
      setValue("");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setSelectDomain(false);
    setSelectGender(false);
    setName("");
    setDomain("");
    setGender("");
    setAvailable(null);
    setData(totaldata);
  };

  return (
    <div className="h-screen flex flex-col items-center ">
      <div className="flex sm:flex-row flex-col">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex justify-center items-center p-4 m-4 mt-16 lg:flex-row flex-col"
        >
          <input
            type="text"
            placeholder="Search"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl p-2 text-gray-100 bg-gray-800"
          />
          <button className="rounded-lg bg-gray-950 text-white px-4 py-2 m-2">
            Search
          </button>
          <div className="relative">
            <button
              id="domainDropdownButton"
              data-dropdown-toggle="dropdown"
              className="text-white h-9   font-medium rounded-lg text-sm p-5  text-center inline-flex items-center bg-gray-950"
              type="button"
              onClick={() => {
                setSelectDomain(!selectDomain);
                setSelectGender(false);
              }}
            >
              {domain ? domain : "Domain"}{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {selectDomain && (
              <div className="absolute mt-2 w-32 z-10 rounded-xl border-2 border-gray-700 max-h-60 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
                <ul
                  className="py-2 bg-gray-950 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="domainDropdownButton"
                >
                  {totaldata.map((user, index) => (
                    <li
                      key={index}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setDomain(user.domain || "");
                      }}
                    >
                      {user.domain}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              id="genderDropdownButton"
              data-dropdown-toggle="dropdown"
              className="text-white h-9   font-medium rounded-lg text-sm p-5 mx-2 text-center inline-flex items-center bg-gray-950"
              type="button"
              onClick={() => {
                setSelectGender(!selectGender);
                setSelectDomain(false);
              }}
            >
              {gender ? gender : "Gender"}{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {selectGender && (
              <div className="absolute mt-2 rounded-xl w-32 z-10 border-2 border-gray-700 max-h-60 mx-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
                <ul
                  className="py-2 text-sm bg-gray-950 text-gray-700 dark:text-gray-200"
                  aria-labelledby="genderDropdownButton"
                >
                  {totaldata.map((user, index) => (
                    <li
                      key={index}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setGender(user.gender || "");
                      }}
                    >
                      {user.gender}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setAvailable(!available);
            }}
            className={`rounded-lg ${
              available === null
                ? "bg-gray-950"
                : available
                ? "bg-green-900"
                : "bg-red-950"
            } text-white px-4 py-2 ml-2`}
          >
            {available === null
              ? "Availability"
              : available
              ? "Available"
              : "Unavailable"}
          </button>
          <button
            onClick={handleClear}
            className="rounded-lg bg-gray-950 text-white px-4 py-2 ml-2"
          >
            Clear
          </button>
        </form>
      </div>
      <div className="flex flex-wrap justify-center p-4">
        {data.map((user, index) => (
          <div key={index} className="">
            <Card book={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
