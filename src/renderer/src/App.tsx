import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { useState } from 'react'

function App(): JSX.Element {
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);

  const loadJson = async () => {
    try{
      const data = await window.electron.loadJson('/home/manuelsrleon');
      setJsonData(data);
    }catch(err : any){
      setError(err.message);
    }
  }

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>

        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={loadJson}>
            Load Json
          </a>
        </div>
      <Versions></Versions>
    </>
  )
}

export default App
