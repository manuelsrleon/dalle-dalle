import "./scenario-banner.css";
import { Link } from "react-router";

function ScenarioBanner({scenario}): JSX.Element {

  return (
    <Link to={"/scenarios/"+scenario.id}>
    <div className="scenario-banner">
      <img className="scenario-banner-img" src={scenario.challenge.mediaPath} alt="" />
      <div className="scenario-description">
        <h5 className="scenario-title">
          {scenario.title}
        </h5>
        <h6 className="scenario-subtitle">
          {scenario.subtitle}
        </h6>
      </div>
    </div>
    </Link>
  )
}

export default ScenarioBanner
