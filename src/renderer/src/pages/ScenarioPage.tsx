import Scenario from "../../../common/model/scenario/scenario";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import "./scenarioPage.css";
import ScenarioBanner from "@renderer/components/ScenarioBanner";
import Modal from 'react-modal';

export const ScenarioPage = () =>  {
    const { scenarioId } = useParams();

    const [scenario, setScenario] = useState<Scenario>();
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(true);
    const [isFailureModalOpen, setIsFailureModalOpen] = useState<boolean>(false);

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
    const modalStyle = { 
            content: {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '700px',
                minHeight: '600px'
            },
            overlay: {
                backgroundColor: 'transparent'
            }
        }
    
    const onSuccess = () => {
        setIsSuccessModalOpen(true);
    }
    
    const onFailure = () => {
        setIsFailureModalOpen(true);
        setTimeout(() => {
            setIsFailureModalOpen(false),
            3000
        })
    }

    const onContinue = () => {
        
    }
    return (
        <div className="scenario-page-container">
            <Modal
                isOpen={isSuccessModalOpen}
                style={modalStyle}
                >
            <div className="scenario-page-success-modal">
                <img className="scenario-page-success-img"
                    src={scenario?.successData.mediaPath} alt={scenario?.successData.mediaPath}>
                </img>
                <div className="scenario-page-success-text">
                    {scenario?.successData.text}
                </div>
                <div className="scenario-page-success-button-bar">
                    <button className="scenario-page-success-retry-button dd-btn-secondary">
                        {"Reintentar"}
                    </button>
                    <Link to={"/"}>
                        <button className="scenario-page-success-continue-button dd-btn-primary">
                            {"Continuar >"}
                        </button>
                    </Link>
                </div>    
            </div>
            </Modal>
            <Modal
                isOpen={isFailureModalOpen}>
                style={modalStyle}
                <div className="scenario-page-failure-modal">
                    <img className= "scenario-page-success-img" 
                        src={scenario?.failureData.mediaPath} alt={scenario?.failureData.mediaPath}>
                    </img>
                    <div className="scenario-page-failure-text">
                        {scenario?.failureData.text}
                    </div>
                </div>
            </Modal>
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