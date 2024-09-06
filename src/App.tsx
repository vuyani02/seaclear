import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar'; // Using the correct Navbar component
import BeachDetailsComponent from './components/BeachDetailsComponent';
import HomePageComponent from './components/HomePageComponent';
import LoginComponent from './components/LoginComponent';
import EducationalContentComponent from './components/EducationalContentComponent';
import AdminPageComponent from './components/AdminPageComponent';
import MapPage from './components/MapPage';
import HelpPage from './components/HelpPage';

type State = {
  currentPage: 'beachList' | 'map' | 'help';
  selectedButton: 'beachList' | 'map' | 'help';
  isLoggedIn: boolean;
  isAdmin: boolean;
};

class App extends Component<{}, State> {
  state: State = {
    currentPage: 'beachList',
    selectedButton: 'beachList',
    isLoggedIn: false,
    isAdmin: false,
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
    const { isLoggedIn, isAdmin } = this.state;

    return (
      <Router>
        <div className="App">
          {/* Single Navbar component */}
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePageComponent />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/beach/:name" element={<BeachDetailsComponent />} />
              <Route
                path="/login"
                element={
                  <LoginComponent
                    setIsLoggedIn={this.setIsLoggedIn}
                    setIsAdmin={this.setIsAdmin}
                  />
                }
              />
              <Route path="/education" element={<EducationalContentComponent />} />
              <Route path="/help" element={<HelpPage />} />
              {isLoggedIn && isAdmin && (
                <Route
                  path="/admin"
                  element={
                    <AdminPageComponent
                      setIsLoggedIn={this.setIsLoggedIn}
                      setIsAdmin={this.setIsAdmin}
                    />
                  }
                />
              )}
              <Route path="*" element={<HomePageComponent />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
