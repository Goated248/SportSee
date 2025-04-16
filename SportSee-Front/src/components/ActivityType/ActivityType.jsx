import "./ActivityType.css"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { getUserPerformance } from "../../api/api";


const ActivityType = () => {
  const { userId } = useParams();
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPerformance = async () => {
      try {
        setLoading(true);
        const data = await getUserPerformance(userId);

        // Transformation des données pour Recharts
        const formattedData = data.data.data.map(item => ({
          subject: data.data.kind[item.kind], // Associe le bon label
          value: item.value
        }));

        setPerformanceData(formattedData);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPerformance();
  }, [userId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!performanceData) return <p>Aucune donnée disponible</p>;

  return (
    <div className="activity-type_chart">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="48%" cy="50%" outerRadius="65%" data={performanceData}>
          <PolarGrid stroke="#fff" radialLines={false} />
          <PolarAngleAxis dataKey="subject" stroke="#fff" tickLine={false} tick={({ payload, x, y, textAnchor }) => (
            <text
              x={x}
              y={y}
              textAnchor={textAnchor}
              fill="#fff"
              fontSize={10}
              dy={4}
            >
              {payload.value}
            </text>
          )} />

          <Radar name="Performance" dataKey="value" stroke="#ff0000" fill="#ff0000" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default ActivityType