import "./Greeting.css"
import React, { useState, useEffect } from "react";
import { getUserInfo } from "../../api/api.js";
import { useParams } from "react-router-dom";

const Greeting = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getUserInfo(userId);
        setUser(data.data.userInfos);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false)
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Aucune donnée disponible</p>;
  return (
    <div className="greeting">
      {user ? <>
        <h1 className="greeting-title">Bonjour <span className="greeting-user">{user.firstName}</span> !</h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </>
        : <p>Chargement...</p>}
    </div>
  );
};
export default Greeting;