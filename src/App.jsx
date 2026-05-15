
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import ProblemSolution from './components/ProblemSolution'
import Features from './components/Features'
import Ingredients from './components/Ingredients'
import OrderForm from './components/OrderForm'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import SuccessPage from './components/SuccessPage'
import styles from './App.module.css'

export default function App() {
  const [ordered, setOrdered] = useState(false)

  // Replace entire page with SuccessPage after order
  if (ordered) return <SuccessPage onReset={() => setOrdered(false)} />

  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <ProblemSolution />
      <Features />
      <Ingredients />
      <OrderForm onSuccess={() => setOrdered(true)} />
      <FAQ />
      <Footer />
    </>
  )
}
