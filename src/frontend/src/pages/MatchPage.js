import { React, useEffect, useState } from "react";
import { MatchDetailCard } from "../component/MatchDetailCard";
import { useParams } from "react-router-dom";
import "./MatchPage.scss";
import { YearSelector } from "../component/YearSelector";

export const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const { teamName, year } = useParams();
  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(
        `http://localhost:8080/team/${teamName}/matches?year=${year}`
      );
      const data = await response.json();
      setMatches(data);
      console.log(matches);
    };
    fetchMatches();
  }, [teamName, year]);
  return (
    <div className="MatchPage">
      <div className="year-selector">
        <h3>Select Year</h3>
        <YearSelector teamName={teamName}></YearSelector>
      </div>
      <div>
        <h1 className="page-heading">
          {teamName} matches in {year}
        </h1>
        {matches.map((match) => (
          <MatchDetailCard teamName={teamName} match={match} />
        ))}
      </div>
    </div>
  );
};
