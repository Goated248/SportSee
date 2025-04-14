import "./VerticalBar.css"
import React from "react"
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";

const VerticalBar = () => {
    return (
      <div className="vertical-bar">
        <div className="icons">
          <img src={icon4} alt="Icon 1" />
          <img src={icon1} alt="Icon 2" />
          <img src={icon2} alt="Icon 3" />
          <img src={icon3} alt="Icon 4" />
        </div>
        <div className="copyright">
          Copyright SportSee2020©
        </div>
      </div>
    );
  };
  
export default VerticalBar;
