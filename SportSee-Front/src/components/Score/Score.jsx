import "./Score.css"
import React,{useEffect, useState} from "react"
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend } from "recharts";

const userData = {
    "data": {
      "id": 18,
      "userInfos": {
        "firstName": "Cecilia",
        "lastName": "Ratorez",
        "age": 34
      },
      "score": 0.3, // 30%
      "keyData": {
        "calorieCount": 2500,
        "proteinCount": 90,
        "carbohydrateCount": 150,
        "lipidCount": 120
      }
    }
    
  };
  
  const score = userData.todayScore || userData.data.score;
  const scorePercentage = score * 100;




const Score = (userId)=> {


  
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

    // Données pour le graphique
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
            endAngle={90 + (360 * userData.data.score)} 
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