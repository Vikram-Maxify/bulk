import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SocialProof from '../components/SocialProof'
import Features from '../components/Features'
import ProductDemo from '../components/ProductDemo'
import Pricing from '../components/Pricing'
import UseCases from '../components/UseCases'
import Testimonials from '../components/Testimonials'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'

const Homepage = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <SocialProof />
    <Features />
    <ProductDemo />
    <Pricing />
    <UseCases />
    <Testimonials />
    <FinalCTA />
    <Footer />
    </>
  )
}

export default Homepage