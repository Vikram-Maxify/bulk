import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import { ToastContainer } from 'react-toastify'
import Homepage from './page/Homepage'

function App() {
  

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />

    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  )
}

export default App
