import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent'; // Import HeaderComponent
import BeachDetailsComponent from './components/BeachDetailsComponent';
import HomePageComponent from './components/HomePageComponent';
import LoginComponent from './components/LoginComponent';
import EducationalContentComponent from './components/EducationalContentComponent';
import AdminPageComponent from './components/AdminPageComponent';
import MapPage from './components/MapPage';
import HelpPage from './components/HelpPage';
import ReportPage from './components/ReportPage'; 
import WebcamPageComponent from './components/WebcamPageComponent'; 

type State = {
  isLoggedIn: boolean;
  isAdmin: boolean;
};

class App extends Component<{}, State> {
  state: State = {
    isLoggedIn: false,
    isAdmin: false,
  };

  setIsLoggedIn = (isLoggedIn: boolean) => {
    this.setState({ isLoggedIn });
  };

  setIsAdmin = (isAdmin: boolean) => {
    this.setState({ isAdmin });
  };

  render() {
    const { isLoggedIn, isAdmin } = this.state;

    return (
      <Router>
        <div className="App">
          <HeaderComponent /> {/* Include HeaderComponent here */}
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
              <Route path="/report" element={<ReportPage />} />
              <Route path="/webcams" element={<WebcamPageComponent />} />
              
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
