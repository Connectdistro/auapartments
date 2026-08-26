import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Double rAF ensures the browser has painted the mounted app before the
// loader starts fading, so there's no flash of blank content between them.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const loader = document.getElementById('site-loader')
    if (!loader) return
    loader.classList.add('is-hidden')
    setTimeout(() => loader.remove(), 400)
  })
})
