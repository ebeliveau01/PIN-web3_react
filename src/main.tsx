import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./global.scss"
import App from './App.tsx'
import LangageProvider from './lib/LangageContext.tsx'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LangageProvider>
                <App />
        </LangageProvider>
    </StrictMode>
)
