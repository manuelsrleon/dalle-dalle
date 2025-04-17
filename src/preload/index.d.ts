import { ElectronAPI } from '@electron-toolkit/preload'
import type Scenario from '@renderer/components/ScenarioBanner';

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
  
  interface ElectronAPI {
    loadSavedScenarios: () => Promise<Scenario[]>;
    loadScenario: () => Promise<Scenario>;
  }
}
