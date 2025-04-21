import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.jsx'
import Level from './pages/Level/Level.jsx';
import Leaderboard from './pages/leaderboard/Leaderboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/level/:id" element={<Level />} />
        <Route path='/leaderboard/:id' element={ <Leaderboard/> }/>
      </Routes>
    </Router>
  </StrictMode>,
)
