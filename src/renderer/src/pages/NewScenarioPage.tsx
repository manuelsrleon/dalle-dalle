import { useState } from "react";
import "./newScenarioPage.css"
import Scenario from "src/common/model/scenario/scenario";

export const NewScenarioPage = () => {

    const [newScenario, setNewScenario] = useState<Scenario>();
    

    const [formData, setFormData] = useState<Scenario>({} as Scenario);
    
    const handleChange = (e) => {

    }
    const validateScenario = (formData: any) => {
    }
    

    const changeMaxTime = (quantity: number) => {
        
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
                Título de escenario
            </label>
            <input id="scenarioTitle" type="text" />
            <label htmlFor="scenarioSubtitle">
                Subtítulo de escenario
            </label>
            <input type="text" id="scenarioSubtitle" />

            <div className="scenario-specific-fields">
                <div className="new-scenario-section dd-card">
                    <h3>Desafío</h3>
                    <label htmlFor="challengePrompt">
                        Pregunta de desafío
                    </label>
                    <input type="text" placeholder="¿Qué situación se propone?"/>
                    <label htmlFor="maxTime">
                        Tiempo máximo (s)
                    </label>
                    <div className="dd-number-picker">
                        <input id="maxTime" type="number" placeholder="0">
                        </input>
                    </div>
                    <label htmlFor="rfidObjectCode">
                        Objeto de la solución
                    </label>
                </div>
                <div className="new-scenario-section dd-card">
                    <h3>Al fallar...</h3>
                    <label htmlFor="failureText">
                        Texto al fallar
                    </label>
                    <input type="text" placeholder="Oops, ¡eso no es!"/>
                
                </div>
                <div className="new-scenario-section dd-card">
                    <h3>Al superarlo...</h3>
                    <label htmlFor="successText">
                        Texto al ganar
                    </label>
                    <input type="text" placeholder="¡Enhorabuena!"/>
                </div>
            </div>
            <button onClick={submitNewScenario}>
                {"Guardar"}
            </button>
        </form>
        {/*
        Título de escenario, subtítulo de escenario, tipo de escenario (default = STANDARD)
        
        Imagen de desafío, texto de desafío, sonido de desafío, rfidObjectCode 
        
        texto de éxito, imagen de éxito, sonido de éxito
        
        imagen de fallo, texto de fallo, sonido de fallo
        
        --ajustes adicionales de escenario
        --versión de escenario con la creación (oculto)
        
        */
        
        }
        </div>
}