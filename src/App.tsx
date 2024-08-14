import React, { Component } from 'react';
import BeachList from './components/BeachList';
import MapPage from './components/MapPage';
import HelpPage from './components/HelpPage';

type State = {
  currentPage: 'beachList' | 'map' | 'help';
  selectedButton: 'beachList' | 'map' | 'help'; // 
};

class App extends Component<{}, State> {
  state: State = {
    currentPage: 'beachList',
    selectedButton: 'beachList'
  };

  // Method to change the current page
  handlePageChange = (page: 'beachList' | 'map' | 'help') => {
    this.setState({ currentPage: page });
  };
handleButtonClick = (button: 'beachList' | 'map' | 'help') => {
  this.setState({ 
    currentPage: button,
    selectedButton: button 
  });
};
  render() {
    const { currentPage } = this.state;

    return (
      <div>
        {/* Navigation Links */}
        {/* <nav>
          <ul>
            <li>
              <button onClick={() => this.handlePageChange('beachList')}>Beach List</button>
            </li>
            <li>
              <button onClick={() => this.handlePageChange('map')}>Map</button>
            </li>
            <li>
              <button onClick={() => this.handlePageChange('help')}>Help</button>
            </li>
          </ul>
        </nav> */}

        {/* Render Components Based on Current Page */}
        {currentPage === 'beachList' && <BeachList />}
        {/* {currentPage === 'map' && <MapPage />}
        {currentPage === 'help' && <HelpPage />} */}
      </div>
    );
  }
}

export default App;
