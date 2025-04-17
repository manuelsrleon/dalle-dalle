import Scenario from "../../../common/model/scenario/scenario";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import "./scenarioPage.css";

export const ScenarioPage = () =>  {
    const { scenarioId } = useParams();

    const [scenario, setScenario] = useState<Scenario>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // const loadScenario: Scenario = () => {
    //     const scenario: Scenario;
    //     return scenario;
    // }
    // useEffect(() => {
    //     setScenario(loadScenario());
    // },[])

    return (

        <div className="scenario-page-container">
            {/* <img src={} alt="" /> */}
            {!isPlaying?
            <div className="scenario-page-cover">
                <div className="scenario-page-title">
                    {/* {scenario?.title} */}
                </div>
                <div className="scenario-page-subtitle">
                    {scenario?.subtitle}
                </div>
                <button className="scenario-page-play-scenario">
                    <img></img>
                    Reproducir
                </button>
            </div>
            :
            <div className=""></div>}
        </div>
        
    )
} 