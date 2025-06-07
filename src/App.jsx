import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import ContactUs from './components/ContactUs'
import Visualizer from './components/Visualizer'

const App = () => {
  return (
    <div>
      <h1>Huffman Coding Algorithm</h1>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/visualizer" element={<Visualizer />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
