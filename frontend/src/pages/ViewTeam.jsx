import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewTeam = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          "https://team-users-application.onrender.com/api/teams"
        );
        const teamsData = response.data;
        const teamsWithUsers = await Promise.all(
          teamsData.map(async (team) => {
            const membersWithUsers = await Promise.all(
              team.members.map(async (memberId) => {
                const userResponse = await axios.get(
                  `https://team-users-application.onrender.com/api/users/${memberId}`
                );
                return userResponse.data;
              })
            );
            return { ...team, members: membersWithUsers };
          })
        );
        setTeams(teamsWithUsers);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const closeModal = () => {
    setSelectedTeam(null);
  };

  return (
    <div className="container mx-auto my-8  grid grid-cols-1">
      <h1 className="text-4xl font-bold mb-4 text-gray-700 outline-dotted max-w-md p-2 text-center">
        View Teams
      </h1>
      <div>
        {teams.map((team) => (
          <div
            key={team._id}
            className="mb-2 rounded-lg shadow-md shadow-slate-900 py-2 hover:shadow-lg max-w-md text-center"
          >
            <h2
              className="text-xl bg-gray-700 text-white hover:bg-gray-950 p-2 rounded-lg cursor-pointer uppercase"
              onClick={() => handleTeamClick(team)}
            >
              {team.name}
            </h2>
          </div>
        ))}
        {selectedTeam && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-2">
            <div className="bg-gray-950 rounded-lg p-8 max-w-md relative">
              <span
                className="absolute top-2 right-2 m-2 text-white cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </span>
              <h2 className="text-xl text-white font-bold mb-4">{selectedTeam.name}</h2>
              <ul>
                {selectedTeam.members.map((member) => (
                  <li key={member._id} className="flex items-center mb-2">
                    <img
                      src={member.avatar}
                      alt={`${member.first_name} ${member.last_name}`}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    {member.first_name} {member.last_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTeam;
