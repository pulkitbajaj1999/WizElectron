import React from 'react'
import { createRoot } from 'react-dom/client'

// css and style imports
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// i18n setup
import '@i18n/index'

// app components
import App from './App'

const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
