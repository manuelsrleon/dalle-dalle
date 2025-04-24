import Scenario from "../../../common/model/scenario/scenario";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"
import "./scenarioPage.css";
import "../global.css"
import ScenarioBanner from "@renderer/components/ScenarioBanner";
import Modal from 'react-modal';

export const ScenarioPage = () =>  {
    const { scenarioId } = useParams();
    let navigate = useNavigate();

    const [scenario, setScenario] = useState<Scenario>();
    const [input, setInput] = useState<string>("");
    const successAudioRef = useRef(new Audio('/media/sounds/success_default.wav'));
    const failureAudioRef = useRef(new Audio('/media/sounds/failure_default.wav'));

    
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
    const [isFailureModalOpen, setIsFailureModalOpen] = useState<boolean>(false);



    useEffect(() => {
        console.log("scenarioId:",scenarioId);
        setIsLoading(true);
        if(scenarioId){
            window.electron.loadScenario(scenarioId).then( 
                results => {
                    setScenario(results as Scenario);
                    console.log("scenario:",scenario)
                }, 
                reject => setError(reject)
            );
        }
    },[])

    useEffect(() => {
        const handleKeyDown = (e) => {
          setInput((prevInput) => {
            const newInput = (prevInput + e.key).slice(scenario ? (-scenario?.challenge.rfidObjectCode.length) : 0);
            if (newInput === scenario?.challenge.rfidObjectCode) {
              onSuccess();
            }else if(newInput.length === scenario?.challenge.rfidObjectCode.length ){
                onFailure();
                return "";
            }
            return newInput;
          });
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [scenario]);
    
    useEffect(() => {

    }, [scenario])
    const playScenario = () => {
        setIsPlaying(true);
    }

    const modalStyle = { 
            content: {
                // top: '50%',
                // left: '50%',
                // transform: 'translate(-50%, -50%)',
                minWidth: '700px',
                minHeight: '600px',
                color: 'black',
                borderRadius: '30px',
                boxShadow: '0px 2px 10px 1px #0004'
            },
            overlay: {
                backgroundColor: 'transparent'
            }
        }
    
    const onSuccess = () => {
        setIsSuccessModalOpen(true);
        playSuccessSound();
    }
    
    const onFailure = () => {
        setIsFailureModalOpen(true);
        playFailureSound();
        setTimeout(() => {
            setIsFailureModalOpen(false)
        }, 6000)
    }
    
    const playSuccessSound = () => {
        const audio = successAudioRef.current;
        audio.currentTime = 0; 
        audio.play().catch(err => console.error("Playback failed:",err));
    }
    //TODO refactor
    const playFailureSound = () => {
        const audio = failureAudioRef.current;
        audio.currentTime = 0; 
        audio.play().catch(err => console.error("Playback failed:", err));
    }

    const onContinue = () => {
        navigate("/");
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
                        <button className="scenario-page-success-continue-button dd-btn-primary"
                            onClick={onContinue}>
                            {"Continuar >"}
                        </button>
                    </Link>
                </div>    
            </div>
            </Modal>
            <Modal
                isOpen={isFailureModalOpen}
                style={modalStyle} >
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
                    Resolver
                </button>
            </div>
            :
            
            <div className="scenario-page-challenge">
                <img src={scenario?.challenge.mediaPath} alt={scenario?.challenge.mediaPath} className="challenge-img"></img>
                <div className="scenario-page-challenge-title">
                    {scenario?.title}
                </div>    
                {/* <div className="scenario-page-subtitle">
                    {scenario?.subtitle}
                    </div> */}
                <div>
                {input?.slice(scenario ? (-scenario?.challenge.rfidObjectCode) : 0)}
                </div>
            </div>}
        </div>
    )
} 