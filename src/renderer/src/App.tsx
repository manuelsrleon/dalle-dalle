import { useEffect, useState } from 'react'
import type Scenario from './model/scenario/scenario';
import ScenarioBanner from './components/ScenarioBanner';
import "./global.css";
import ChallengeData from './model/scenario/challenge-data';


function App(): JSX.Element {
  const [error, setError] = useState(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  // useEffect(() => {
  //   loadSavedScenarios();
  // })
  const loadSavedScenarios = async () => {
    try {
      const rawData = await window.electron.loadSavedScenarios();
      const mappedScenarios: Scenario[] = rawData.map(
      )
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
      challengeData: {} as ChallengeData
    }

    return {

    } as Scenario;
  }
  return (
    <>
      <button onClick={loadSavedScenarios}>Load</button>
      <div className="action">
        {scenarios.map((scenario) => (
          <ScenarioBanner scenario={scenario}></ScenarioBanner>
        ))}
      </div>

    </>
  )
}

export default App
