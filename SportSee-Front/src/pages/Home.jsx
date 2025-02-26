import "./Home.css"
import React, {useState, useEffect} from "react"
import Navbar from '../components/Navbar/Navbar'
import Greeting from '../components/Greeting/Greeting'
import DailyActivity from '../components/DailyActivity/DailyActivity'
import VerticalBar from "../components/VerticalBar/VerticalBar"
import KeyInfos from "../components/KeyInfos/KeyInfos"
import AverageSession from "../components/AverageSession/AverageSession"
import ActivityType from "../components/ActivityType/ActivityType"
import Score from "../components/Score/Score"

const Home = ({ userId }) => {
    return (
        <div className="container">
        <Navbar />
            <div className="main-page">
                <VerticalBar />
                <div className="active-page">
                
                    <div className="active-page_main">
                        <Greeting />
                        <DailyActivity />
                        <div className="active-page_main_charts">
                        <AverageSession/>
                        <ActivityType/>
                        <Score/>
                        </div>
                    </div>
                    <div className="active-page_key_infos">
                        <KeyInfos/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home