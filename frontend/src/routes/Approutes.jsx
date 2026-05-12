import React from 'react'
import LoginPage from '../features/pages/LoginPage'
import RegisterPage from '../features/pages/RegisterPage'
import Homepage from '../features/pages/Homepage'
import { Route,Routes } from 'react-router-dom'
import LandingPage from '../features/pages/Landingpage'

const Approutes = () => {
  return (
    <Routes>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={ <RegisterPage />} />
    <Route path='/Homepage' element={<Homepage />} />
    <Route path='/' element={<LandingPage />} />
    </Routes>
  )
}

export default Approutes
