import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@solana/wallet-adapter-react-ui/styles.css";
import 'animate.css';
import './index.css'
import { SolanaProvider } from './contexts/solana.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SolanaProvider>
      <App />
    </SolanaProvider>
  </React.StrictMode>,
)
