import { React, useEffect, useState } from "react";
import { MatchSmallCard } from "../component/MatchSmallCard";
import { MatchDetailCard } from "../component/MatchDetailCard";
import { useParams } from "react-router-dom";

export const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] });
  const { teamName } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(`http://localhost:8080/team/${teamName}`);
      const data = await response.json();
      console.log(data);
      setTeam(data);
    };
    fetchMatches();
  }, [teamName]);
  if (!team || !team.teamName) {
    return <h2>Oooppss!! Team Not Found!</h2>;
  }
  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      <MatchDetailCard
        teamName={team.teamName}
        match={team.matches[0]}
      ></MatchDetailCard>

      {team.matches?.slice(1).map((match) => (
        <MatchSmallCard teamName={team.teamName} match={match} />
      ))}
    </div>
  );
};
