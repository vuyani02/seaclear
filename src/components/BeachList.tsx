import React, { Component, ChangeEvent } from 'react';// classs

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
  username: string;
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
    this.setState({ selectedBeach: beach, showSources: false });
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
    }
  };

  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [event.target.name]: event.target.value } as any);
  };

  handleRegisterToggle = () => {
    this.setState({ isRegistering: !this.state.isRegistering });
  };

  render() {
    const { beaches, selectedBeach, showSources, loggedIn, isRegistering, username, password, newComment, newReport, reportDate, reportSource } = this.state;

    return (
      <div>
        <header style={styles.header}>
          <h1>SeaClear - Beach Water Quality</h1>
          {!loggedIn ? (
            <div style={styles.authContainer}>
              {isRegistering ? (
                <div style={styles.authForm}>
                  <h2>Create an Account</h2>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.handleChange}
                    style={styles.input}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange}
                    style={styles.input}
                  />
                  <button onClick={this.handleRegister} style={styles.authButton}>
                    Register
                  </button>
                  <button onClick={this.handleRegisterToggle} style={styles.authButton}>
                    Back to Login
                  </button>
                </div>
              ) : (
                <div style={styles.authForm}>
                  <h2>Login</h2>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.handleChange}
                    style={styles.input}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange}
                    style={styles.input}
                  />
                  <button onClick={this.handleLogin} style={styles.authButton}>
                    Login
                  </button>
                  <button onClick={this.handleRegisterToggle} style={styles.authButton}>
                    Create an Account
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={this.handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          )}
        </header>

        <div style={styles.alertContainer}>
          <p>Log in if you want to post a comment or submit a report</p>
        </div>

        {!selectedBeach ? (
          <div style={styles.container}>
            <h2>Beaches in Cape Town</h2>
            <ul style={styles.beachList}>
              {beaches.map((beach, index) => (
                <li
                  key={index}
                  style={styles.beachItem}
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
        ) : (
          <div style={styles.detailsContainer}>
            <div style={styles.fullPage}>
              <button onClick={() => this.setState({ selectedBeach: null })} style={styles.backButton}>
                Back to Beach List
              </button>

              <div style={styles.beachDetails}>
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
                  style={styles.viewSourcesButton}
                >
                  {showSources ? 'Hide Sources' : 'View Sources'}
                </button>

                {showSources && (
                  <div style={styles.sourcesList}>
                    <h3>Sources of Reports:</h3>
                    <ul>
                      {selectedBeach.sources.map((source, index) => (
                        <li key={index}>{source}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3>Add a Comment</h3>
                  <textarea
                    name="newComment"
                    value={newComment}
                    onChange={this.handleChange}
                    placeholder="Type your comment here..."
                    style={styles.commentInput}
                  />
                  <button onClick={this.handleAddComment} style={styles.commentButton}>
                    Submit Comment
                  </button>
                </div>

                <h3>Comments</h3>
                <ul style={styles.commentList}>
                  {selectedBeach.comments.length > 0 ? (
                    selectedBeach.comments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))
                  ) : (
                    <li>No comments yet</li>
                  )}
                </ul>
              </div>
            </div>

            {loggedIn && (
              <div style={styles.reportForm}>
                <h3>Report an Issue</h3>
                <textarea
                  name="newReport"
                  value={newReport}
                  onChange={this.handleChange}
                  placeholder="Type your report here..."
                  style={styles.commentInput}
                />
                <input
                  type="date"
                  name="reportDate"
                  value={reportDate}
                  onChange={this.handleChange}
                  style={styles.input}
                />
                <input
                  type="text"
                  name="reportSource"
                  value={reportSource}
                  onChange={this.handleChange}
                  placeholder="Source of the report"
                  style={styles.input}
                />
                <button onClick={this.handleAddReport} style={styles.commentButton}>
                  Submit Report
                </button>
              </div>
            )}
          </div>
        )}

        <footer style={styles.footer}>
          <p>SeaClear - Beach Water Quality. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

const styles = {
  header: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    textAlign: 'center' as const,
  },
  alertContainer: {
    backgroundColor: '#ffcc00',
    padding: '1rem',
    textAlign: 'center' as const,
    fontWeight: 'bold' as const,
  },
  container: {
    padding: '1rem',
  },
  beachList: {
    listStyleType: 'none',
    padding: 0,
  },
  beachItem: {
    padding: '1rem',
    marginBottom: '0.5rem',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
  },
  fullPage: {
    flex: 3,
    padding: '1rem',
  },
  reportForm: {
    flex: 1,
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  beachDetails: {
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    display: 'block',
    margin: '1rem 0',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  viewSourcesButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  sourcesList: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
  },
  commentInput: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '0.5rem',
  },
  commentButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  commentList: {
    listStyleType: 'none',
    padding: 0,
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    textAlign: 'center' as const,
  },
  authContainer: {
    padding: '1rem',
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
  },
  input: {
    marginBottom: '0.5rem',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '200px',
  },
  authButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '0.5rem',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',//eufjrfjh
  },
};

export default BeachList;
