import "./ActivityType.css"
import React from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from "recharts";

const rawData = {
    "data": {
      "userId": 18,
      "kind": {
        "1": "Cardio",
        "2": "Energy",
        "3": "Endurance",
        "4": "Strength",
        "5": "Speed",
        "6": "Intensity"
      },
      "data": [
        { "value": 200, "kind": 1 },
        { "value": 240, "kind": 2 },
        { "value": 80, "kind": 3 },
        { "value": 80, "kind": 4 },
        { "value": 220, "kind": 5 },
        { "value": 110, "kind": 6 }
      ]
    }
  };

const ActivityType = ()=> {
const formattedData = rawData.data.data.map(item => ({
    subject: rawData.data.kind[item.kind],
    value: item.value
  }));

  return (
    <div className="activity-type_chart">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={formattedData}>
          <PolarGrid  stroke="#fff" radialLines={false} />
          <PolarAngleAxis dataKey="subject" stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "10px" }} />
          <Radar name="Performance" dataKey="value" stroke="#ff0000" fill="#ff0000" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default ActivityType