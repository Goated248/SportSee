import React from "react";
import "./InfosCard.css"; 




const InfosCard = ({ title, value, unit,icon, bgColor }) => {

    
  return (
    <div className="card">
        <div className="card-container" style={{ backgroundColor: `${bgColor}80`}}>
        <img src={icon} alt="Calorie icon" className="card-container_icon"/>
        </div>
        <div className="card-content">
            <h3>{value} {unit}</h3>
            <p>{title}</p>
        </div>
    </div>
  );
};

export default InfosCard;
