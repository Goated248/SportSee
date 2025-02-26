import "./AverageSession.css";
import React, {useEffect} from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,Rectangle } from "recharts";

const data = [
  { day:"L", sessionLength: 30 },
  { day: "M", sessionLength: 40 },
  { day: "M", sessionLength: 50 },
  { day: "J", sessionLength: 30 },
  { day: "V", sessionLength: 30 },
  { day: "S", sessionLength: 50 },
  { day: "D", sessionLength: 50 }
];

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

const CustomCursor = (props) => {
  const { points, width, height,} = props;
  const { x, y } = points[0];
  console.log(props);
  return (
    <Rectangle
      fill="#E60000"

      stroke="#E60000"
      x={x}
      y={y}
      width={width}
      height={height}
      className="line-cursor"
    />
  );
};

const AverageSession = () => {
  const formattedData = data.map(session => ({
    day: `${session.day}`,
    sessionLength: session.sessionLength
  }));

  return (
    <div className="line-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
        <text x="50%" y="20" textAnchor="middle" fontSize="16" fontWeight="bold"  style={{color:"rgba(255, 255, 255, 0.5) "}}>
        Durée moyenne des sessions
       </text>
          <XAxis padding={{ left: 10, right: 10 }} tickLine={false} axisLine={false} dataKey="day" stroke="#8884d8" tick={{ fill: '#FFFFFF', opacity: '0.5' }}/>
          <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }} cursor={<CustomCursor/>} content={CustomTooltip}/>
          <Line type="monotone" dataKey="sessionLength" stroke="#fff" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSession;
          