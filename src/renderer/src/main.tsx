import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./global.css"

import { BrowserRouter, Route, Routes } from 'react-router'
import { ScenarioPage } from './pages/ScenarioPage';
import { TopBar } from './components/TopBar';
import { NewScenarioPage } from './pages/NewScenarioPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <TopBar></TopBar>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/scenarios/new" element={<NewScenarioPage />} />
      <Route path="/scenarios/:scenarioId" element={<ScenarioPage/>} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
