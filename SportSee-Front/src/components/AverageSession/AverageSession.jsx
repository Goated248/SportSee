import "./AverageSession.css";
import { getUserAverageSessions } from "../../api/api";
import React, {useEffect, useState, useRef} from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,Rectangle } from "recharts";
import { useParams } from "react-router-dom";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="session-tooltip">
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const CustomCursor = ({ points, currentChartProprotions }) => {
  if (!points || points.length === 0) return null;
  const { x } = points[0];

  return (
    <Rectangle
      fill="rgba(255, 255, 255, 0.2)"

      
      x={x}
      y={0}
      width={currentChartProprotions?.clientWidth}
      height={currentChartProprotions?.clientHeight}
      className="line-cursor"
    />
  );
};

const AverageSession = () => {
  const {userId} = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef(null)
  const [currentChartProprotions, setCurrentChartProportions] = useState(null);

  useEffect(() => {
    if (containerRef?.current) {
      setCurrentChartProportions(containerRef.current);
    }

    const fetchUserSession = async () => {
      try {
        setLoading(true);
        const sessionData = await getUserAverageSessions(userId);
        const daysMapping = ["L", "M", "M", "J", "V", "S", "D"];
        
        const formattedData = [
          { day: "", sessionLength: sessionData.data.sessions[0].sessionLength }, 
          ...sessionData.data.sessions.map(session => ({
            day: daysMapping[session.day - 1],
            sessionLength: session.sessionLength
          })),
          { day: "", sessionLength: sessionData.data.sessions[sessionData.data.sessions.length - 1].sessionLength } 
        ];
        

        setSessionData(formattedData);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
  }, [userId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!sessionData) return <p>Aucune donnée disponible</p>;

  return (
    <div className="line-chart">
  
  <div className="chart-title">Durée moyenne des <br /> sessions</div>
      <ResponsiveContainer width="100%" height="100%" ref={containerRef}>
        <LineChart data={sessionData} >
        <YAxis 
      hide={true} 
      domain={['dataMin - 10', 'dataMax + 20']} // Ajoute un écart pour descendre la ligne
    />
          <XAxis padding={{ left: -20, right: -20 }} tickLine={false} axisLine={false} dataKey="day" stroke="#8884d8" tick={{ fill: '#FFFFFF', opacity: '0.5' }}/>
          <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }} cursor={<CustomCursor currentChartProprotions={currentChartProprotions}/>} content={CustomTooltip}  wrapperStyle={{ zIndex: 1 }}/>
          <Line type="monotone" dataKey="sessionLength" stroke="#fff" strokeWidth={2} dot={false} strokeLinecap="round"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSession;
          