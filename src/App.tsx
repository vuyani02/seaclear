import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePageComponent from './components/HomePageComponent';
import BeachDetailsComponent from './components/BeachDetailsComponent';
import LoginComponent from './components/LoginComponent';
import AdminPageComponent from './components/AdminPageComponent';
import MapPageComponent from './components/MapPageComponent';
import EducationalContentComponent from './components/EducationalContentComponent';
import Navbar from './components/NavBar'; 
import HelpPage from './components/HelpPage'; 
import './styles.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePageComponent />} />
            <Route path="/beach/:name" element={<BeachDetailsComponent />} />
            <Route 
              path="/login" 
              element={<LoginComponent setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} 
            />
            <Route path="/map" element={<MapPageComponent />} />
            <Route path="/education" element={<EducationalContentComponent />} />
            <Route path="/help" element={<HelpPage />} /> 
            {isLoggedIn && isAdmin && (
              <Route 
                path="/admin" 
                element={<AdminPageComponent setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} 
              />
            )}
            {/* Redirect to login if not logged in */}
            <Route path="*" element={<HomePageComponent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
