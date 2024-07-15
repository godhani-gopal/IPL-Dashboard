import { React, useEffect, useState } from "react";

import { TeamTile } from "../component/TeamTile";

import "./HomePage.scss";
import Navbar from "../component/Navbar";

export const HomePage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchAllTeams = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team`);
      const data = await response.json();
      setTeams(data);
    };
    fetchAllTeams();
  }, []);

  return (
    <div className="HomePage">
      <div className="header-section">
        <h1 className="app-name">IPL Dashboard</h1>
        <h2 className="app-info">Matches from 2008 to 2020</h2>
        <hr />
      </div>
      <div className="team-grid">
        {teams.map((team) => (
          <TeamTile key={team.id} teamName={team.teamName} />
        ))}
      </div>
      <Navbar />
    </div>
  );
};
