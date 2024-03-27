import { React, useEffect, useState } from "react";
import { MatchSmallCard } from "../component/MatchSmallCard";
import { MatchDetailCard } from "../component/MatchDetailCard";

export const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] });

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(
        "http://localhost:8080/team/Mumbai%20Indians"
      );
      const data = await response.json();
      console.log(data);
      setTeam(data);
    };
    fetchMatches();
  }, []);

  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      <MatchDetailCard match={team.matches[0]}></MatchDetailCard>

      {team.matches?.slice(1).map((match) => (
        <MatchSmallCard match={match} />
      ))}
    </div>
  );
};
