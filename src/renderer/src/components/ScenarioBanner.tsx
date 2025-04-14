import Scenario from "@renderer/model/scenario/scenario";

import "./scenario.css";

function ScenarioBanner({scenario}): JSX.Element {
  // const [scenario, setScenario] = useState<Scenario>();


  return (
    <div className="scenario-banner">
      <img className="scenario-img" src={scenario.challenge.mediaPath} alt="" />
      <div className="scenario-description">
        <h5 className="scenario-title">
          {scenario.title}
        </h5>
        <h6 className="scenario-subtitle">
          {scenario.subtitle}
        </h6>
      </div>
    </div>
  )
}

export default ScenarioBanner
