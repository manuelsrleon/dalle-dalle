import { useEffect, useState } from 'react'
import type Scenario from './model/scenario/scenario';
import ScenarioBanner from './components/ScenarioBanner';
import "./global.css";


function App(): JSX.Element {
  const [error, setError] = useState(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  // useEffect(() => {
  //   loadSavedScenarios();
  // })
  const loadSavedScenarios = async () => {
    try {
      window.electron.loadSavedScenarios().then(
        (data) => { console.log(data); setScenarios(data) }
      );

    } catch (err: any) {
      setError(err.message);
    }
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
