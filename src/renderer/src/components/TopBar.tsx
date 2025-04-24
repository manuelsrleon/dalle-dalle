import "./topbar.css"
import "../global.css"
import dalleDalleLogo from "../assets/dalle-dalle-light.png";


import { useLocation, useNavigate } from "react-router"

export const TopBar = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const onBannerClicked = () => {
        navigate("/");
    }

    const onNewScenarioCreation = () => {
        navigate("scenarios/new");
    }
    return <div className="top-bar">
        <img id="app-logo" src={dalleDalleLogo} onClick={onBannerClicked} alt="dalle-dalle" />
        {location.pathname == "/"?
        <button className="new-scenario-button dd-btn-secondary" 
            onClick={onNewScenarioCreation}>{"+ Add scenario"}
        </button>
        :
        <></>}
    </div>
}