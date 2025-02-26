import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DailyActivity.css'
const data = [
  { day: 'Lun', poids: 70, calories: 240 },
  { day: 'Mar', poids: 71, calories: 220 },
  { day: 'Mer', poids: 69, calories: 260 },
  { day: 'Jeu', poids: 72, calories: 210 },
  { day: 'Ven', poids: 70, calories: 230 },
  { day: 'Sam', poids: 71, calories: 250 },
  { day: 'Dim', poids: 72, calories: 270 },
];


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const poids = payload.find((p) => p.dataKey === "poids")?.value;
    const calories = payload.find((p) => p.dataKey === "calories")?.value;

    return (
      <div className="activity-tooltip">
        <p className="tooltip-value">{`${poids}kg`}</p>
        <p className="tooltip-value">{`${calories}kcal`}</p>
      </div>
    );
  }
  return null;
};

const ActivityChart = () => {
  return (
    <div className='daily-activity'>
      <div className='daily-activity_header'>
        <h3>Activité quotidienne</h3>
        
      </div>
      
    <ResponsiveContainer width="100%" height="85%">
      <BarChart  data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={8}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis  dataKey="day" />
        <YAxis orientation="right"/>
        <Tooltip content={<CustomTooltip/>}/>
        <Legend  verticalAlign='top' align='right'iconType='circle' iconSize={8}
        formatter={(value,) => 
          <span style={{ color:'#74798C' }} className="text-color-class">{value}</span>}
          wrapperStyle={{paddingBottom: 30}}/>
        <Bar dataKey="poids" fill="#000000" name="Poids (kg)" radius={[50, 50, 0, 0]} />
        <Bar dataKey="calories" fill="#E60000" name="Calories brûlées" radius={[50, 50, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;