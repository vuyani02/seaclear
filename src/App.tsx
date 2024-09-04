import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePageComponent from './components/HomePageComponent';
import BeachDetailsComponent from './components/BeachDetailsComponent';
import LoginComponent from './components/LoginComponent';
import MapPageComponent from './components/MapPageComponent';
import EducationalContentComponent from './components/EducationalContentComponent';
import Navbar from './components/NavBar'; // Import Navbar
import HelpPage from './components/HelpPage'; 
import './styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Include Navbar here */}
        <main>
          <Routes>
            <Route path="/" element={<HomePageComponent />} />
            <Route path="/beach/:name" element={<BeachDetailsComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/map" element={<MapPageComponent />} />
            <Route path="/education" element={<EducationalContentComponent />} />
            <Route path="/help" element={<HelpPage />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
