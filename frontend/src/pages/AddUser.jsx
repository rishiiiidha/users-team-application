import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultAvatarUrl =
  "https://robohash.org/ullamsuntet.png?size=50x50&set=set1";

const AddUser = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [domain, setDomain] = useState("");
  const [available, setAvailable] = useState(false);
  const [avatar, setAvatar] = useState(defaultAvatarUrl); // Initialize with default avatar URL

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  };

  const handleAvailabilityChange = (e) => {
    setAvailable(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      gender: gender,
      domain: domain,
      available: available,
      avatar: avatar, // Include avatar in the user data
    };

    try {
      await axios.post(
        "https://team-users-application.onrender.com/api/users",
        newUser
      );
      alert("User added successfully");
      navigate("/api/users");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full mt-12 text-gray-100">
      <div className="flex flex-col w-96 p-8 bg-gray-950 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-6">Add User</h1>
        <img
          src={avatar}
          alt="Avatar"
          className="w-12 h-12 mb-4 mx-auto rounded-full"
        />
        <div className="mb-4">
          <label htmlFor="firstName" className="text-lg">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            className="border bg-gray-800 border-gray-800 px-3 py-2 rounded-md w-full"
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="text-lg">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            className="border bg-gray-800 border-gray-800 px-3 py-2 rounded-md w-full"
            onChange={handleLastNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-lg">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            className="border bg-gray-800 border-gray-800 px-3 py-2 rounded-md w-full"
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="text-lg">
            Gender:
          </label>
          <input
            type="text"
            id="gender"
            value={gender}
            className="border bg-gray-800 border-gray-800 px-3 py-2 rounded-md w-full"
            onChange={handleGenderChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="domain" className="text-lg">
            Domain:
          </label>
          <input
            type="text"
            id="domain"
            value={domain}
            className="border bg-gray-800 border-gray-800 px-3 py-2 rounded-md w-full"
            onChange={handleDomainChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="availability" className="text-lg">
            Availability:
          </label>
          <input
            type="checkbox"
            id="availability"
            checked={available}
            className="mx-2"
            onChange={handleAvailabilityChange}
          />
          <label htmlFor="availability" className="text-lg">
            Available
          </label>
        </div>
        <button
          className="border bg-gray-800 border-gray-800 px-3 py-2 rounded-md w-full"
          onClick={handleSubmit}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddUser;
