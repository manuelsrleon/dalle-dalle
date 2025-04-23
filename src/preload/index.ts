import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import Scenario from '../common/model/scenario/scenario'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      loadSavedScenarios: async () => ipcRenderer.invoke('load-saved-scenarios'),
      loadScenario: async (scenarioId: string) => ipcRenderer.invoke('load-scenario', scenarioId),
      createScenario: async (scenario: Scenario) => ipcRenderer.invoke('create-scenario', scenario)
    },
      )
    contextBridge.exposeInMainWorld('api', api)
    
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = {...electronAPI, 
    loadSavedScenarios: async () => ipcRenderer.invoke('load-saved-scenarios'),
    loadScenario: async (scenarioId: string) => ipcRenderer.invoke('load-scenario', scenarioId),
    createScenario: async (scenario: Scenario) => ipcRenderer.invoke('create-scenario', scenario)
  }
  // @ts-ignore (define in dts)
  window.api = api
}
