import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TEST from './TEST'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TEST />
  </StrictMode>,
)
