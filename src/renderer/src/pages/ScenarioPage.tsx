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
        console.log("scenarioId:",scenarioId);
        setIsLoading(true);
        if(scenarioId){
            window.electron.loadScenario(scenarioId).then( 
                results => {setScenario(results as Scenario);console.log("scenario:",scenario)}, 
                reject => setError(reject)
            );
        }
    },[])

    const playScenario = () => {
        setIsPlaying(true);
    }
    return (
        <div className="scenario-page-container">
            {/* <img src={} alt="" /> */}
            {!isPlaying && scenario?
            <div className="scenario-page-cover">
                <ScenarioBanner scenario={scenario}></ScenarioBanner>
                <button className="scenario-page-play-scenario" onClick={playScenario}>
                    Reproducir
                </button>
            </div>
            :
            
            <div className="scenario-page-challenge">
                <img src={scenario?.challenge.mediaPath} alt={scenario?.challenge.mediaPath}></img>
                <div className="scenario-page-challenge-title">
                    {scenario?.title}
                </div>    
                {/* <div className="scenario-page-subtitle">
                    {scenario?.subtitle}
                </div> */}
            </div>}
        </div>
        
    )
} 