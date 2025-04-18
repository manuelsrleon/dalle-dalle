import { useState } from "react";
import "./scenarioPage.css"
import Scenario from "src/common/model/scenario/scenario";

export const NewScenarioPage = () => {

    const newScenario = useState<Scenario>();
    
    const validateScenario = (formData: any) => {
    }
    
    const submitNewScenario = () => {
        // if(validateScenario(newScenario)){
        //     window.electron.createNewScenario();
        // }
    }

    return <div className="new-scenario-page-container dd-page">
        <h2>New Scenario</h2>
        <form action="submit" className="dd-form">
            <label htmlFor="scenarioTitle">
                Nombre de escenario
            </label>
            <input id="scenarioTitle" type="text" />
            <label htmlFor="scenarioSubtitle">
            </label>
            <label htmlFor="scenarioSubtitle">
            </label>
            <label htmlFor="maxTime">
                Tiempo máximo
            </label>
            <input type="text" placeholder="0">
            
            </input>
        </form>
        <input type="text" />
        {/*
        Título de escenario, subtítulo de escenario, tipo de escenario (default = STANDARD)
        
        Imagen de desafío, texto de desafío, sonido de desafío, rfidObjectCode 
        
        texto de éxito, imagen de éxito, sonido de éxito
        
        imagen de fallo, texto de fallo, sonido de fallo
        
        --ajustes adicionales de escenario
        --versión de escenario con la creación (oculto)
        
        */
        
        }
        <button onClick={submitNewScenario}>

        </button>
        </div>
}