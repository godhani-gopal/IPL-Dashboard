import { React, useEffect, useState } from "react";
import { MatchSmallCard } from "../component/MatchSmallCard";
import { MatchDetailCard } from "../component/MatchDetailCard";
import { Link, useParams } from "react-router-dom";
import "./TeamPage.scss";
import { PieChart } from "react-minimal-pie-chart";
export const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] });
  const { teamName } = useParams();

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`
      );
      const data = await response.json();
      setTeam(data);
    };
    fetchTeam();
  }, [teamName]);

  if (!team || !team.teamName) {
    return <h1>Oooppss!! Team Not Found!</h1>;
  }
  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1 className="team-name">{team.teamName}</h1>
      </div>
      <div className="win-loss-section">
        <h3>Wins / Losses</h3>
        <PieChart
          data={[
            { title: "Wins", value: team.totalWins, color: "rgb(99, 162, 99)" },
            {
              title: "Lossses",
              value: team.totalMatches - team.totalWins,
              color: "rgb(178, 99, 99)",
            },
          ]}
        ></PieChart>
      </div>
      <div className="match-detail-section">
        <h3>Latest Matches</h3>
        <MatchDetailCard
          teamName={team.teamName}
          match={team.matches[0]}
        ></MatchDetailCard>
      </div>

      {team.matches?.slice(1).map((match) => (
        <MatchSmallCard key={match.id} teamName={team.teamName} match={match} />
      ))}

      <div className="more-link">
        <Link
          to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}
        >
          More ＞
        </Link>
      </div>
    </div>
  );
};
