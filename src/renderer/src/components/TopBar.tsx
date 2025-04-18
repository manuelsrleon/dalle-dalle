import "./topbar.css"
import "../global.css"
import { useNavigate } from "react-router"

export const TopBar = () => {

    const navigate = useNavigate();

    const onBannerClicked = () => {
        navigate("/");
    }
    return <div id="top-bar">
        <img src="app-logo" onClick={onBannerClicked} alt="dalle-dalle" />

    </div>
}