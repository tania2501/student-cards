import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './styles/index.scss'

import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { App } from './App.tsx'
import { GlobalError } from './components/GlobalError/GlobalError.tsx'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
    <GlobalError />
  </StrictMode>
)
