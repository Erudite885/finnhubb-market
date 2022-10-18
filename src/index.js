import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { contextProvider } from './store/context'
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <contextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </contextProvider>
  </React.StrictMode>
);
