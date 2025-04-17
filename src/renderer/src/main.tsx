import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./global.css"

import { BrowserRouter, Route, Routes } from 'react-router'
import { ScenarioPage } from './pages/ScenarioPage';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/scenarios/:scenarioId" element={<ScenarioPage/>} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
