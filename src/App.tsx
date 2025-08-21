import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FAQPage from './pages/FAQ'
import { WalletProvider } from './contexts/wallet'
import Proof from './pages/Proof'
import Experience from './pages/Experience'
import { Toaster } from "sonner";

import bg from '@/assets/cover-bg.png'
import Home from './pages/Home'

const App = () => {

  return (
    <WalletProvider>
      <BrowserRouter>
        <div className="overflow-hidden relative min-h-screen bg-background text-foreground">
          <img src={bg} className='block object-cover absolute right-0 left-0 top-20 mx-auto md:top-0' />
          <div className="relative z-10 gradient-bottom-border">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/proof" element={<Proof />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </div>
          <Toaster richColors position="top-right" />
        </div>
      </BrowserRouter>
    </WalletProvider>
  )
}

export default App
