import './App.css'
import { Header } from "@/components/header"
import Hero from './components/hero'
import HowItWorks from './components/how-it-works'
import WhyDrip from './components/why-drip'
import Rewards from './components/rewards'
import Community from './components/community'
import Insurance from './components/insurance'
import RoadMap from './components/road-map'
import JoinUs from './components/join-us'
import Footer from './components/footer'

function App() {

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />
      <main className="">
        <Hero />
        <HowItWorks />
        <WhyDrip />
        <Rewards />
        <Community />
        <Insurance />
        <RoadMap />
        <JoinUs />
      </main>
      <Footer />
    </div>
  )
}

export default App
