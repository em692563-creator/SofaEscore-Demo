import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import League from './pages/League';

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#0d0d1a', fontFamily: 'sans-serif' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/liga/:leagueKey" element={<League />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
