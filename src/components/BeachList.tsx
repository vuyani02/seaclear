import React, { Component, ChangeEvent } from 'react';

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
      new Beach("Clifton Beach", "Good", "Popular beach known for its white sands.", "22°C", "15 km/h", "One of the most photographed beaches in the world.", ["Source 1", "Source 2"], []),
      new Beach("Muizenberg Beach", "Moderate", "A family-friendly beach with good surfing conditions.", "20°C", "10 km/h", "Known for its colorful beach huts.", ["Source 1", "Source 2"], [])
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
      this.setState(prevState => ({
        users: [...prevState.users, new User(this.state.username, this.state.password)],
        isRegistering: false
      }));
      alert('Registration successful!');
    } else {
      alert('Please fill in both fields.');
    }
  };

  handleAddComment = () => {
    if (this.state.loggedIn) {
      if (this.state.newComment.trim()) {
        if (this.state.selectedBeach) {
          this.state.selectedBeach.addComment(new Comment(this.state.username, this.state.newComment));
          this.setState({
            selectedBeach: new Beach(
              this.state.selectedBeach.name,
              this.state.selectedBeach.quality,
              this.state.selectedBeach.description,
              this.state.selectedBeach.temperature,
              this.state.selectedBeach.windSpeed,
              this.state.selectedBeach.funFacts,
              this.state.selectedBeach.sources,
              this.state.selectedBeach.comments
            ),
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
        const newReport = new Report(
          this.state.username,
          this.state.selectedBeach.name,
          this.state.newReport,
          this.state.reportDate,
          this.state.reportSource
        );
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
                      <li key={index}>{comment.content}</li>
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
    padding: '20px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center'
  },
  authContainer: {
    margin: '20px'
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '200px'
  },
  authButton: {
    margin: '10px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  logoutButton: {
    margin: '10px',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  alertContainer: {
    textAlign: 'center',
    padding: '10px'
  },
  container: {
    padding: '20px'
  },
  beachList: {
    listStyleType: 'none',
    padding: 0
  },
  beachItem: {
    cursor: 'pointer',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px'
  },
  detailsContainer: {
    padding: '20px'
  },
  fullPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  backButton: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  beachDetails: {
    textAlign: 'center'
  },
  viewSourcesButton: {
    margin: '10px',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  sourcesList: {
    marginTop: '10px'
  },
  commentInput: {
    width: '300px',
    height: '100px',
    padding: '10px'
  },
  commentButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  commentList: {
    listStyleType: 'none',
    padding: 0
  },
  reportForm: {
    marginTop: '20px'
  },
  footer: {
    padding: '10px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center'
  }
};

export default BeachList;
