import './App.css'
import { Header } from "@/components/header"
import Hero from './components/hero'
import HowItWorks from './components/how-it-works'
import WhyDrip from './components/why-drip'
import Rewards from './components/rewards'
import Community from './components/community'
import Insurance from './components/insurance'

function App() {

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />
        <main className="">
          <Hero/>
          <HowItWorks />
          <WhyDrip />
          <Rewards />
          <Community />
          <Insurance />
        </main>
    </div>
  )
}

export default App
