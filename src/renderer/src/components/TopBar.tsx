import "./topbar.css"
import "../global.css"
import dalleDalleLogo from "../assets/dalle-dalle-light.png";


import { useNavigate } from "react-router"

export const TopBar = () => {

    const navigate = useNavigate();

    const onBannerClicked = () => {
        navigate("/");
    }
    return <div id="top-bar">
        <img id="app-logo" src={dalleDalleLogo} onClick={onBannerClicked} alt="dalle-dalle" />

    </div>
}