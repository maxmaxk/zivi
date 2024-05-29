import React from 'react'
import { createRoot } from 'react-dom/client'
import App from 'app'
import './styles.module.scss'

const rootNode = document.getElementById('root')
if (rootNode !== null) {
  const root = createRoot(rootNode)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
