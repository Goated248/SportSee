import './App.css'
import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <Router>
        <Routes>
        <Route path="/:userId" element={<Home />} /> {/* Route dynamique */}
        <Route path="/" element={<Home />} /> {/* Redirection par défaut */}
        </Routes>
    </Router>
    )
}

export default App
