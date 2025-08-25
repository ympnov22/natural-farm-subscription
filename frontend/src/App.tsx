import React from 'react'
import './App.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PlanComparison } from './components/PlanComparison'
import { ServiceIntro } from './components/ServiceIntro'
import { ProcessFlow } from './components/ProcessFlow'
import { Options } from './components/Options'
import { FAQ } from './components/FAQ'
import { Testimonials } from './components/Testimonials'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <Header />
      <main>
        <Hero />
        <PlanComparison />
        <ServiceIntro />
        <ProcessFlow />
        <Options />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

export default App
