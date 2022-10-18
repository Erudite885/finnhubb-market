import React from 'react'
import { StockViewPage, StockDetailPage } from './pages/index'
import { Routes, Route } from 'react-router-dom'



import './App.css'

const App = () => {

  return (
    <main>
      <div className="app">
        <h1>
          Market Price <span className='span'>Viewer</span>
        </h1>
      </div>

      <Routes>
        <Route path="/" element={<StockViewPage />} />
        <Route path="/detail/:symbol" element={<StockDetailPage />} />
      </Routes>
    </main>
  );
}

export default App
