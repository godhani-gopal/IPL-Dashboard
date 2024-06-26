import React from "react";
import "./MatchDetailCard.scss";
import { Link } from "react-router-dom";

export const MatchDetailCard = ({ teamName, match }) => {
  if (!match) return null;
  const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
  const otherTeamRoute = `/teams/${otherTeam}`;
  const isMatchWon = teamName === match.matchWinner;
  // Create a new Date object
  const date = new Date(match.date);

  // Format the date
  const formattedDate = `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <div
      className={
        isMatchWon ? "MatchDetailCard won-card" : "MatchDetailCard lost-card"
      }
    >
      <div>
        <span className="vs">vs</span>
        <h1>
          <Link to={otherTeamRoute}>{otherTeam}</Link>
        </h1>
        <h2 className="match-date">{formattedDate}</h2>
        <h3 className="match-venue"> at {match.venue}</h3>
        <h3 className="match-result">
          {match.matchWinner} 🏆 won by {match.resultMargin} {match.result}
        </h3>
      </div>
      <div className="additional-details">
        <h3>First Innings</h3>
        <p>{match.team1}</p>
        <h3>Second Innings</h3>
        <p>{match.team2}</p>
        <h3>Man of the Match</h3>
        <p>{match.playerOfMatch}</p>
        <h3>Umpires</h3>
        <p>
          {match.umpire1}, {match.umpire2}
        </p>
      </div>
    </div>
  );
};
