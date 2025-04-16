import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DailyActivity.css'
import { getUserActivity } from '../../api/api';
import { useParams } from 'react-router-dom';



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

const DailyActivity = () => {

  const { userId } = useParams();
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        setLoading(true);
        const dailyData = await getUserActivity(userId);
        const daysMapping = ["1", "2", "3", "4", "5", "6", "7"];

        // Reformater les données
        const formattedData = dailyData.data.sessions.map((session, index) => ({
          day: daysMapping[index],
          poids: session.kilogram,
          calories: session.calories,
        }));
        setActivityData(formattedData)
      } catch (error) {
        setError("Erreur lors de la récupération des données.")
      } finally {
        setLoading(false)
      }

    }
    fetchUserActivity()
  }, [userId])

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!activityData) return <p>Erreur lors de la récupération des données</p>;

  const minPoids = Math.min(...activityData.map(session => session.poids)) - 1;
  const maxPoids = Math.max(...activityData.map(session => session.poids)) + 1;
  const minCal = 0;
  const maxCal = Math.max(...activityData.map(session => session.calories)) + 25;
  return (
    <div className='daily-activity'>
      <div className='daily-activity_header'>
        <h3>Activité quotidienne</h3>

      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={8}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />

          {/* YAxis pour le poids  */}
          <YAxis yAxisId="left" orientation="right" tick={{ fill: '#74798C' }} domain={[minPoids, maxPoids]} />

          {/* YAxis pour les calories  */}
          <YAxis yAxisId="right" domain={[minCal, maxCal]} hide={true} />

          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign='top' align='right' iconType='circle' iconSize={8}
            formatter={(value) => <span style={{ color: '#74798C' }}>{value}</span>}
            wrapperStyle={{ paddingBottom: 30 }}
          />

          <Bar dataKey="poids" fill="#000000" name="Poids (kg)" radius={[50, 50, 0, 0]} yAxisId="left" />
          <Bar dataKey="calories" fill="#E60000" name="Calories brûlées(Kcal)" radius={[50, 50, 0, 0]} yAxisId="right" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyActivity;