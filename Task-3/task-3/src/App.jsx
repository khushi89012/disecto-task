import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Product } from './components/product.jsx'
import { Navbar } from './components/navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import { Product_details } from './components/product_details.jsx'
function App() {
 

  return (
    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product_details/:id" element={<Product_details />} />
      </Routes>
   

    
    </div>
  )
}

export default App
