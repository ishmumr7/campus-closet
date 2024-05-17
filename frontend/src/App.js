import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage, SignUpPage, ActivationPage } from './Routes'
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/sign-up' element={<SignUpPage />}></Route>
        <Route path='/activation/:activation_token' element={<ActivationPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App