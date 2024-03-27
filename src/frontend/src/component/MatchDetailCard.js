import React from "react";
import "./MatchDetailCard.css";
import { Link } from "react-router-dom";

export const MatchDetailCard = ({ teamName, match }) => {
  if (!match) return null;
  const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
  const otherTeamRoute = `/teams/${otherTeam}`;

  // Create a new Date object
  const date = new Date(match.date);

  // Format the date
  const formattedDate = `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <div className="MatchDetailCard">
      <h2>Latest Matches</h2>
      <h2>
        vs <Link to={otherTeamRoute}>{otherTeam}</Link>
      </h2>
      <h3>{formattedDate}</h3>
      <h3>📍 at {match.venue}</h3>
      <h3>
        🏆 {match.matchWinner} 🏆 won by {match.resultMargin} {match.result}
      </h3>
    </div>
  );
};
