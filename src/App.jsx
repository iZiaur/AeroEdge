import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import ChatInterface from './components/ChatInterface'
import EdgePerformance from './components/EdgePerformance'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ChatInterface />
        <EdgePerformance />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}

export default App
