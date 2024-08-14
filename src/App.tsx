import React, { Component } from 'react';
import BeachList from './components/BeachList';
import MapPage from './components/MapPage'; // Import the MapPage component

type State = {
  currentPage: 'beachList' | 'map';
  // Other state properties
};

class App extends Component<{}, State> {
  state: State = {
    currentPage: 'beachList',
    // Other state initializations
  };

  render() {
    const { currentPage } = this.state;

    return (
      <div>
        {/* Navigation and other components */}
        {currentPage === 'beachList' && <BeachList />}
        {currentPage === 'map' && <MapPage />}
        {/* Additional content */}
      </div>
    );
  }
}

export default App;
