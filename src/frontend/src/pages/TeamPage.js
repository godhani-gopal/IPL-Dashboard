import { React, useEffect, useState } from "react";
import { MatchSmallCard } from "../component/MatchSmallCard";
import { MatchDetailCard } from "../component/MatchDetailCard";
import { Link, useParams } from "react-router-dom";
import "./TeamPage.scss";
import { PieChart } from "react-minimal-pie-chart";
import Navbar from "../component/Navbar";
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
        <h1 className="team-name outside-fonts">{team.teamName}</h1>
      </div>
      <div className="win-loss-section">
        <h3 className="outside-fonts">Wins / Losses</h3>
        <PieChart
          data={[
            { title: "Wins", value: team.totalWins, color: "#27b21f" },
            {
              title: "Lossses",
              value: team.totalMatches - team.totalWins,
              color: "#fe3c3c",
            },
          ]}
        ></PieChart>
      </div>
      <div className="match-detail-section">
        <h3 className="outside-fonts">Latest Matches</h3>
        <MatchDetailCard
          teamName={team.teamName}
          match={team.matches[0]}
        ></MatchDetailCard>
      </div>

      {team.matches?.slice(1).map((match) => (
        <MatchSmallCard key={match.id} teamName={team.teamName} match={match} />
      ))}

      <div className="more-link">
        <Link className="outside-fonts"
          to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}
        >
          More ＞
        </Link>
      </div>
      <Navbar />
    </div>
  );
};
