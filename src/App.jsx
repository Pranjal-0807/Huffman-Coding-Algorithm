import React from 'react'
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import ContactUs from './components/ContactUs'
import Visualization from './components/Visualization'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <h1>Huffman Coding Algorithm</h1>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/visualizer" element={<Visualization />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
