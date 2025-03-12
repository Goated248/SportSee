import "./Score.css"
import { useParams } from "react-router-dom";
import React,{useEffect, useState} from "react"
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend } from "recharts";
import { getUserInfo } from "../../api/api";
 




const Score = ()=> {
  const { userId } = useParams(); // Récupération de userId depuis l'URL
  const [score, setScore] = useState(null); // État pour stocker le score
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data = await getUserInfo(userId);
        const userScore = data.data.todayScore || data.data.score
        setScore(userScore);
      } catch (err) {
        setError("Impossible de récupérer les données");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // Se met à jour si userId change

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (score === null) return <p>Aucune donnée disponible</p>;

  const scorePercentage = score * 100;

  
  const renderCustomizedLabel = ({ viewBox }) => {
    const { cx, cy } = viewBox;
    
    return (
      <text x={cx} y={cy} textAnchor="middle">
        <tspan x={cx} dy="-5" fontSize="18px" fill="black" fontWeight="bold">
          {`${scorePercentage}%`}
        </tspan>
        <tspan x={cx} dy="20" fontSize="12px" fill="gray">
          de votre objectif
        </tspan>
      </text>
    );
  };

    //donnée pour graphique
    const data = [
      { name: "Completion", value: scorePercentage, fill: "#ff0000" }, // Jauge rouge
      
    ];
  
    return (
      <div className="score-chart">
        
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart
            cx="60%" 
            cy="50%" 
            innerRadius="80%" 
            outerRadius="100%" 
            startAngle={90} 
            endAngle={90 + (360 * score)} 
            barSize={10} 
            data={data}
            radius={[50, 50, 0, 0]}
          >
            <text x="50%" y="20" textAnchor="middle" fontSize="16" fontWeight="bold" color="rgba(255, 255, 255, 0.5)">
        Score
       </text>
            <RadialBar cornerRadius={50}  dataKey="value" label={renderCustomizedLabel}/>
          </RadialBarChart>
          
        </ResponsiveContainer>
      </div>
    );
}
export default Score