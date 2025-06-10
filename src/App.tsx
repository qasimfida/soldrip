import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from "@/components/header"
import Footer from './components/footer'
import Home from './pages/Home'
import FAQPage from './pages/FAQ'

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-background text-foreground">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
