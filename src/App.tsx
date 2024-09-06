import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Add this import
//import BeachList from './components/BeachList';
import MapPage from './components/MapPage';
import HelpPage from './components/HelpPage';
import Navbar from './components/NavBar'; // Add this import if you have a Navbar component
import BeachDetailsComponent from './components/BeachDetailsComponent'; // Ensure these component names are correct
import HomePageComponent from './components/HomePageComponent'; 
import LoginComponent from './components/LoginComponent';
import EducationalContentComponent from './components/EducationalContentComponent';
import AdminPageComponent from './components/AdminPageComponent';

type State = {
  currentPage: 'beachList' | 'map' | 'help';
  selectedButton: 'beachList' | 'map' | 'help';
  isLoggedIn: boolean; // Add isLoggedIn
  isAdmin: boolean;    // Add isAdmin
};

class App extends Component<{}, State> {
  state: State = {
    currentPage: 'beachList',
    selectedButton: 'beachList',
    isLoggedIn: false,  // Set initial state for isLoggedIn
    isAdmin: false,     // Set initial state for isAdmin
  };

  // Method to change the current page
  handlePageChange = (page: 'beachList' | 'map' | 'help') => {
    this.setState({ currentPage: page });
  };

  // Handle button click
  handleButtonClick = (button: 'beachList' | 'map' | 'help') => {
    this.setState({ 
      currentPage: button,
      selectedButton: button 
    });
  };

  // Method to set login status
  setIsLoggedIn = (isLoggedIn: boolean) => {
    this.setState({ isLoggedIn });
  };

  // Method to set admin status
  setIsAdmin = (isAdmin: boolean) => {
    this.setState({ isAdmin });
  };

  render() {
    const { currentPage, isLoggedIn, isAdmin } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/map" element={<MapPage />} />
              <Route path="/" element={<HomePageComponent />} />
              <Route path="/beach/:name" element={<BeachDetailsComponent />} />
              <Route 
                path="/login" 
                element={<LoginComponent setIsLoggedIn={this.setIsLoggedIn} setIsAdmin={this.setIsAdmin} />} 
              />
              <Route path="/education" element={<EducationalContentComponent />} />
              <Route path="/help" element={<HelpPage />} />
              {isLoggedIn && isAdmin && (
                <Route 
                  path="/admin" 
                  element={<AdminPageComponent setIsLoggedIn={this.setIsLoggedIn} setIsAdmin={this.setIsAdmin} />} 
                />
              )}
              {/* Redirect to home page if route doesn't exist */}
              <Route path="*" element={<HomePageComponent />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
