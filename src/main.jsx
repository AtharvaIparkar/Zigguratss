import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AntiGravityGallery } from './App.jsx'

// Enable background and particles for full experience
// Auto-disable on mobile for better performance
const isMobile = window.innerWidth < 768;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AntiGravityGallery
      enableBackground={true}
      enableParticles={true}
    />
  </StrictMode>,
)
