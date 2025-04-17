import Scenario from "../../../common/model/scenario/scenario";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import "./scenarioPage.css";
import ScenarioBanner from "@renderer/components/ScenarioBanner";

export const ScenarioPage = () =>  {
    const { scenarioId } = useParams();

    const [scenario, setScenario] = useState<Scenario>();
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        if(scenarioId){
            window.electron.loadScenario(scenarioId).then( 
                results => setScenario(results as Scenario), 
                reject => setError(reject)
            );
        }
    },[])

    return (
        <div className="scenario-page-container">
            {/* <img src={} alt="" /> */}
            {!isPlaying?
            <div className="scenario-page-cover">
                <ScenarioBanner scenario={scenario}></ScenarioBanner>
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