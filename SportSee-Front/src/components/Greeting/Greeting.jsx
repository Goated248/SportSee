import "./Greeting.css"
import React,{useState,useEffect} from "react";
import { getUserInfo } from "../../api/api.js";
import { useParams } from "react-router-dom";

const Greeting = ()=> {
    const [user, setUser] = useState(null);
    const {userId} = useParams();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserInfo(userId);
                setUser(data.data.userInfos); 
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchUser();
    }, [userId]);

      return (
        <div className="greeting">
          {user ? <>
        <h1 className="greeting-title">Bonjour <span className="greeting-user">{user.firstName}</span> !</h1>
        <p>Félicitations! Vous avez explosé vos objectifs hier.</p>
      </>
      : <p>Chargement...</p>}
        </div>
      );
    };
export default Greeting;