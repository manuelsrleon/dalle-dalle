import { useEffect, useState } from 'react'
import type Scenario from './model/scenario/scenario';
import ScenarioBanner from './components/ScenarioBanner';
import "./global.css";
import "./app.css"
import ChallengeData from './model/scenario/challenge-data';
import SuccessData from './model/scenario/success-data';
import FailureData from './model/scenario/failure-data';


function App(): JSX.Element {
  const [error, setError] = useState(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    loadSavedScenarios();
  }, [])
  const loadSavedScenarios = async () => {
    try {
      const scenarios =
        await window.electron
        .loadSavedScenarios()
        .then(results =>  Promise.all(results.map(scenarioQueryResultToScenarioMapper)))
      console.log(scenarios);
      setScenarios(scenarios);
    } catch (err: any) {
      setError(err.message);
    }
  }

  type ScenarioQueryResult = {
    type: string;
    title: string;
    subtitle: string;
    challenge_prompt: string;
    challenge_mediaPath: string;
    challenge_maxTime: number;
    challenge_rfidObjectCode: string;
    success_text: string;
    success_mediaPath: string;
    success_soundPath: string;
    failure_text: string;
    failure_mediaPath: string;
    failure_soundPath: string;
  }
  const scenarioQueryResultToScenarioMapper = async (scenarioQueryResult: ScenarioQueryResult) => {
    let mappedScenario: Scenario = {} as Scenario;
    mappedScenario = {
      type: scenarioQueryResult.type,
      title: scenarioQueryResult.title,
      subtitle: scenarioQueryResult.subtitle,
      challenge: {
        prompt: scenarioQueryResult.challenge_prompt,
        mediaPath: scenarioQueryResult.challenge_mediaPath,
        soundPath: scenarioQueryResult.success_soundPath,
        maxTime: scenarioQueryResult.challenge_maxTime,
        rfidObjectCode: scenarioQueryResult.challenge_rfidObjectCode
      } as ChallengeData,
      successData: {
        text: scenarioQueryResult.success_text,
        mediaPath: scenarioQueryResult.success_mediaPath,
        soundPath: scenarioQueryResult.success_soundPath
      } as SuccessData,
      failureData: {
        text: scenarioQueryResult.failure_text,
        mediaPath: scenarioQueryResult.failure_mediaPath,
        soundPath: scenarioQueryResult.failure_soundPath
      } as FailureData,
      settings: undefined
    }
    console.log(mappedScenario);
    return mappedScenario;
  }
  return (
    <>
      {/* <button onClick={loadSavedScenarios}>Load</button> */}
        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <ScenarioBanner scenario={scenario}></ScenarioBanner>
          ))}
        </div>

    </>
  )
}

export default App
