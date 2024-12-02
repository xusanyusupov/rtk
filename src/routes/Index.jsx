import React from 'react'
import Hero from "../pages/hero/Hero"
import Header from '../components/header/Header'
import { Route, Routes } from 'react-router-dom'
const Index = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/hero' element={<Hero />} />
      </Routes>
    </div>
  )
}

export default Index
