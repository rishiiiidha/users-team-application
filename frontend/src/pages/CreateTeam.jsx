import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TeamAddCard from "../componenets/TeamAddCard";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [totaldata, setTotalData] = useState([]);
  const [selectDomain, setSelectDomain] = useState(false);
  const [domain, setDomain] = useState("");
  const [selectGender, setSelectGender] = useState(false);
  const [gender, setGender] = useState("");
  const [available, setAvailable] = useState(null);
  const domainRef = useRef(null);
  const genderRef = useRef(null);
  const [team, setTeam] = useState([]);
  const [count, setCount] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (team.length === 6) {
      alert("Your team has reached the maximum limit. Please create the team.");
      setCount(false);
    }
  }, [team]);

   const genders = [
     "Male",
     "Female",
     "Transgender",
     "Agender",
     "Genderqueer",
     "Bigender",
     "Genderfluid",
     "Polygender",
     "Non-binary",
   ];

   const domains = [
     "Sales",
     "IT",
     "UI Designing",
     "Finance",
     "Marketing",
     "Management",
     "Business Development",
   ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        domainRef.current &&
        !domainRef.current.contains(event.target) &&
        selectDomain
      ) {
        setSelectDomain(false);
      }

      if (
        genderRef.current &&
        !genderRef.current.contains(event.target) &&
        selectGender
      ) {
        setSelectGender(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectDomain, selectGender]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/users?name=${name}&domain=${domain}&gender=${gender}&available=${available}`
        );
        setData(data.users);
        setTotalData(data.users);
      } catch (err) {
        console.log("Error: ", err.message);
      }
    };

    fetchData();
  }, [name, domain, gender, available]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSelectDomain(false);
    setSelectGender(false);

    try {
      const { data } = await axios.get(
        `https://team-users-application.onrender.com/api/users?name=${name}&domain=${domain}&gender=${gender}&available=${available}`
      );

      if (data.users.length === 0) {
        alert("No users found");
        setData(totaldata);
      } else {
        setData(data.users);
      }
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
  const handleTeamCreate = async () => {
    try {
      await axios.post("http://localhost:3000/api/teams", {
        name: teamName,
        members: team,
      });
      // console.log(team);
      alert("Team created successfully");
      navigate(`/api/users/team/`);
      setTeam([]);
      setTeamName("");
      setCount(false);
    } catch (err) {
      // console.log(team);
      console.error("Error creating team:", err);
      alert(
        "Failed to create team. User might be in another team,Please check and try again."
      );
      navigate(`/api/users/team/`);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center ">
      <div className="flex sm:flex-row flex-col">
        <form
          action=""
          onSubmit={handleSearch}
          className="flex justify-center items-center p-4 m-4 mt-16 lg:flex-row flex-col"
        >
          <input
            type="text"
            placeholder="Search"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="rounded-xl p-2 text-gray-100 bg-gray-800"
          />

          <button className="rounded-lg bg-gray-950 text-white px-4 py-2 m-2">
            Search
          </button>
          <div className="relative" ref={domainRef}>
            <button
              id="domainDropdownButton"
              className="text-white h-9   font-medium rounded-lg text-sm p-5 m-2  text-center inline-flex items-center bg-gray-950"
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
              <div className="absolute mt-2 w-32 no-scrollbar z-10 rounded-xl border-2 border-gray-700 max-h-60 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
                <ul
                  className="py-2 bg-gray-950 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="domainDropdownButton"
                >
                  {domains.map((dom, index) => (
                    <li
                      key={index}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setDomain(dom || "");
                      }}
                    >
                      {dom}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative" ref={genderRef}>
            <button
              id="genderDropdownButton"
              className="text-white h-9  m-2 font-medium rounded-lg text-sm p-5 mx-2 text-center inline-flex items-center bg-gray-950"
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
              <div className="absolute mt-2 no-scrollbar rounded-xl w-32 z-10 border-2 border-gray-700 max-h-60 mx-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
                <ul
                  className="py-2 text-sm bg-gray-950 text-gray-700 dark:text-gray-200"
                  aria-labelledby="genderDropdownButton"
                >
                  {genders.map((gen, index) => (
                    <li
                      key={index}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setGender(gen || "");
                      }}
                    >
                      {gen}
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
            } text-white px-4 py-2 m-2 ml-2`}
          >
            {available === null
              ? "Availability"
              : available
              ? "Available"
              : "Unavailable"}
          </button>
          <button
            onClick={handleClear}
            className="rounded-lg bg-gray-950 text-white px-4 m-2 py-2 ml-2"
          >
            Clear
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1">
        {count &&
          data.map((user, index) => (
            <div key={index} className="m-4 w-full">
              <TeamAddCard
                book={user}
                team={team}
                handleTeam={setTeam}
                count={count}
              />
            </div>
          ))}
        {!count && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-950 text-white bg-opacity-50 p-10">
            <div className="bg-gray-950 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Create Team</h2>
              <input
                type="text"
                placeholder="Enter Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="rounded-lg p-2 mb-4 w-full bg-gray-800 text-white"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleTeamCreate}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTeam;
