import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import { App } from './index.app'
import { ThemeProvider } from './index.theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
