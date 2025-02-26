import "./KeyInfos.css"
import React,{useState, useEffect} from "react"
import InfosCard from "../InfosCard/InfosCard";
import { getUserInfo } from "../../api/api.js";
import calIcon from "../../assets/energy.svg";
import protIcon from "../../assets/chicken.svg";
import carbIcon from "../../assets/apple.svg";
import lipIcon from "../../assets/cheeseburger.svg";

const KeyInfos = ()=> {
    const [user, setUser] = useState(null);
    const userId = 18;
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserInfo(userId);
                setUser(data.data); 
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchUser();
    }, []);
    if (!user) {
        return <div>Loading...</div>;
      }
    
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