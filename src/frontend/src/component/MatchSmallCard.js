import { React } from "react";
import { Link } from "react-router-dom";
import "./MatchSmallCard.scss";

export const MatchSmallCard = ({ teamName, match }) => {
  const isMatchWon = teamName === match.matchWinner;
  if (!match) return null;
  const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
  const otherTeamRoute = `/teams/${otherTeam}`;
  return (
    <div
      className={
        isMatchWon ? "MatchSmallCard won-card" : "MatchSmallCard lost-card"
      }
    >
      <span className="vs">vs</span>
      <h1>
        <Link to={otherTeamRoute}>{otherTeam}</Link>
      </h1>
      <p>
        {match.matchWinner} won by {match.resultMargin} {match.result}
      </p>
    </div>
  );
};
