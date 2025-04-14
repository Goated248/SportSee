import "./KeyInfos.css"
import { useParams } from "react-router-dom";
import React,{useState, useEffect} from "react"
import InfosCard from "../InfosCard/InfosCard";
import { getUserInfo } from "../../api/api.js";
import calIcon from "../../assets/energy.svg";
import protIcon from "../../assets/chicken.svg";
import carbIcon from "../../assets/apple.svg";
import lipIcon from "../../assets/cheeseburger.svg";

const KeyInfos = ()=> {
    const [user, setUser] = useState(null);
    const {userId} = useParams();
    const [error, setError]= useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
              setLoading(true)
                const data = await getUserInfo(userId);
                setUser(data.data); 
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }finally{
              setLoading(false)
            }
        };

        fetchUser();
    }, []);
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>Erreur lors de la récupération des données </p>;
    
    return (
        <div className="key-infos">
          
          <InfosCard title="Calories" value={user.keyData.calorieCount} unit="kCal" icon={calIcon} bgColor={'#FF0000'}/>
          
          <InfosCard title="Protéines" value={user.keyData.proteinCount} unit="g" icon={protIcon} bgColor={'#4AB8FF'}/>
          
          <InfosCard title="Glucides" value={user.keyData.carbohydrateCount} unit="g" icon={carbIcon} bgColor={'#F9CE23'}/>
          
          <InfosCard title="Lipides" value={user.keyData.lipidCount} unit="g" icon={lipIcon} bgColor={'#FD5181'}/>
        </div>
      );
    };
    



export default KeyInfos