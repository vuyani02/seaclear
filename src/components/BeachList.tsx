import React, { Component, ChangeEvent } from 'react';
import './BeachList.css'; // Import the CSS file

type Beach = {
  name: string;
  quality: string;
  description: string;
  temperature: string;
  windSpeed: string;
  funFacts: string;
  sources: string[];
  comments: string[];
};

type User = {
  username: string;// hey
  password: string;
};

type Report = {
  username: string;
  beachName: string;
  report: string;
  date: string;
  source: string;
};

type State = {
  currentPage: 'beachList' | 'beachDetails' | 'map';
  beaches: Beach[];
  selectedBeach: Beach | null;
  showSources: boolean;
  loggedIn: boolean;
  username: string;
  password: string;
  newComment: string;
  newReport: string;
  reportDate: string;
  reportSource: string;
  isRegistering: boolean;
  users: User[];
  reports: Report[];
};

class BeachList extends Component<{}, State> {
  state: State = {
    currentPage: 'beachList',
    beaches: [
      {
        name: "Clifton Beach",
        quality: "Good",
        description: "Popular beach known for its white sands.",
        temperature: "22°C",
        windSpeed: "15 km/h",
        funFacts: "One of the most photographed beaches in the world.",
        sources: ["Source 1", "Source 2"],
        comments: [],
      },
      {
        name: "Muizenberg Beach",
        quality: "Moderate",
        description: "A family-friendly beach with good surfing conditions.",
        temperature: "20°C",
        windSpeed: "10 km/h",
        funFacts: "Known for its colorful beach huts.",
        sources: ["Source 1", "Source 2"],
        comments: [],
      }
    ],
    selectedBeach: null,
    showSources: false,
    loggedIn: false,
    username: '',
    password: '',
    newComment: '',
    newReport: '',
    reportDate: '',
    reportSource: '',
    isRegistering: false,
    users: [],
    reports: [],
  };

  handleBeachClick = (beach: Beach) => {
    this.setState({
      selectedBeach: beach,
      showSources: false,
      currentPage: 'beachDetails' // Change the page to beachDetails
    });
  };

  handleLogin = () => {
    const user = this.state.users.find(
      user => user.username === this.state.username && user.password === this.state.password
    );
    if (user) {
      this.setState({ loggedIn: true, isRegistering: false });
    } else {
      alert('Invalid credentials');
    }
  };

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      username: '',
      password: ''
    });
  };

  handleRegister = () => {
    if (this.state.username && this.state.password) {
      this.setState({
        users: [...this.state.users, { username: this.state.username, password: this.state.password }],
        isRegistering: false
      });
      alert('Registration successful!');
    } else {
      alert('Please fill in both fields.');
    }
  };

  handleAddComment = () => {
    if (this.state.loggedIn) {
      if (this.state.newComment.trim()) {
        if (this.state.selectedBeach) {
          const updatedBeaches = this.state.beaches.map(beach =>
            beach.name === this.state.selectedBeach?.name
              ? { ...beach, comments: [...beach.comments, `${this.state.username}: ${this.state.newComment}`] }
              : beach
          );
          this.setState({
            beaches: updatedBeaches,
            selectedBeach: updatedBeaches.find(beach => beach.name === this.state.selectedBeach?.name) || null,
            newComment: ''
          });
        }
      } else {
        alert('Comment cannot be empty.');
      }
    } else {
      alert('You must be logged in to add a comment.');
    }
  };

  handleAddReport = () => {
    if (this.state.loggedIn) {
      if (this.state.newReport.trim() && this.state.reportDate.trim() && this.state.reportSource.trim() && this.state.selectedBeach) {
        const newReport = {
          username: this.state.username,
          beachName: this.state.selectedBeach.name,
          report: this.state.newReport,
          date: this.state.reportDate,
          source: this.state.reportSource
        };
        this.setState(prevState => ({
          reports: [...prevState.reports, newReport],
          newReport: '',
          reportDate: '',
          reportSource: ''
        }));
        alert('Report submitted successfully!');
      } else {
        alert('All fields must be filled out.');
      }
    } else {
      alert('You must be logged in to submit a report.');
    }
  };

  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [event.target.name]: event.target.value } as any);
  };

  handleRegisterToggle = () => {
    this.setState({ isRegistering: !this.state.isRegistering });
  };

  render() {
    const { beaches, selectedBeach, showSources, loggedIn, isRegistering, username, password, newComment, newReport, reportDate, reportSource, currentPage } = this.state;

    console.log('Current Page:', currentPage);
    console.log('Selected Beach:', selectedBeach);
    console.log('Logged In:', loggedIn);

    return (
      <div>
        <header className="header">
          <h1>SeaClear - Beach Water Quality</h1>
          <div className="nav-buttons">
            <button onClick={() => this.setState({ currentPage: 'beachList' })}>Beaches</button>
            <button onClick={() => this.setState({ currentPage: 'map' })}>Map</button>
            {!loggedIn ? (
              <div className="auth-container">
                {isRegistering ? (
                  <div className="auth-form">
                    <h2>Create an Account</h2>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={this.handleChange}
                      className="input"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.handleChange}
                      className="input"
                    />
                    <button onClick={this.handleRegister} className="auth-button">
                      Register
                    </button>
                    <button onClick={this.handleRegisterToggle} className="auth-button">
                      Back to Login
                    </button>
                  </div>
                ) : (
                  <div className="auth-form">
                    <h2>Login</h2>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={this.handleChange}
                      className="input"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.handleChange}
                      className="input"
                    />
                    <button onClick={this.handleLogin} className="auth-button">
                      Login
                    </button>
                    <button onClick={this.handleRegisterToggle} className="auth-button">
                      Create an Account
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={this.handleLogout} className="logout-button">
                Logout
              </button>
            )}
          </div>
        </header>

        <div className="alert-container">
          <p>Log in if you want to post a comment or submit a report</p>
        </div>

        {currentPage === 'beachList' && !selectedBeach && (
          <div className="container">
            <h2>Beaches in Cape Town</h2>
            <ul className="beach-list">
              {beaches.map((beach, index) => (
                <li
                  key={index}
                  className="beach-item"
                  onClick={() => this.handleBeachClick(beach)}
                >
                  <h3>{beach.name}</h3>
                  <p>
                    <strong>Water Quality:</strong> {beach.quality}
                  </p>
                  <p>{beach.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentPage === 'beachDetails' && selectedBeach && (
          <div className="details-container">
            <div className="full-page">
              <button 
                onClick={() => this.setState({ selectedBeach: null, currentPage: 'beachList' })} 
                className="back-button"
              >
                Back to Beach List
              </button>

              <div className="beach-details">
                <h2>{selectedBeach.name}</h2>
                <p>
                  <strong>Water Quality:</strong> {selectedBeach.quality}
                </p>
                <p>{selectedBeach.description}</p>
                <p>
                  <strong>Temperature:</strong> {selectedBeach.temperature}
                </p>
                <p>
                  <strong>Wind Speed:</strong> {selectedBeach.windSpeed}
                </p>
                <p>
                  <strong>Fun Facts:</strong> {selectedBeach.funFacts}
                </p>
                <button
                  onClick={() => this.setState({ showSources: !showSources })}
                  className="view-sources-button"
                >
                  {showSources ? 'Hide Sources' : 'View Sources'}
                </button>
                {showSources && (
                  <div className="sources-list">
                    <h3>Sources of Reports:</h3>
                    <ul>
                      {selectedBeach.sources.map((source, index) => (
                        <li key={index}>{source}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {loggedIn && (
                  <div>
                    <textarea
                      name="newComment"
                      value={newComment}
                      onChange={this.handleChange}
                      placeholder="Add a comment"
                    />
                    <button onClick={this.handleAddComment}>Add Comment</button>
                    <textarea
                      name="newReport"
                      value={newReport}
                      onChange={this.handleChange}
                      placeholder="Submit a report"
                    />
                    <input
                      type="date"
                      name="reportDate"
                      value={reportDate}
                      onChange={this.handleChange}
                    />
                    <input
                      type="text"
                      name="reportSource"
                      value={reportSource}
                      onChange={this.handleChange}
                      placeholder="Source of the report"
                    />
                    <button onClick={this.handleAddReport}>Submit Report</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'map' && (
          <div className="map-container">
            <h2>Map Page</h2>
            {/* Add map content here */}
          </div>
        )}
      </div>
    );
  }
}

export default BeachList;
