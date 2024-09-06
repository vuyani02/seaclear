import React from 'react';
import './BeachDetails.css'; // Import the CSS for styling

interface Beach {
  name: string;
  quality: string;
  description: string;
  temperature: string;
  windSpeed: string;
  funFacts: string;
  sources: string[];
  comments: string[];
}

interface BeachDetailsProps {
  beach: Beach;
  loggedIn: boolean;
  onReportSubmit: (report: string, date: string, source: string) => void;
  onLoginClick: () => void;
}

const BeachDetails: React.FC<BeachDetailsProps> = ({
  beach,
  loggedIn,
  onReportSubmit,
  onLoginClick,
}) => {
  const [report, setReport] = React.useState('');
  const [reportDate, setReportDate] = React.useState('');
  const [reportSource, setReportSource] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = () => {
    if (loggedIn) {
      onReportSubmit(report, reportDate, reportSource);
      setReport('');
      setReportDate('');
      setReportSource('');
      setErrorMessage('');
    } else {
      setErrorMessage('You are not logged in. Please log in.');
    }
  };

  return (
    <div className="beach-details">
      <header className="header">
        <h1>SeaClear</h1>
        <button className="login-button" onClick={onLoginClick}>Login</button>
      </header>

      <div className="details-container">
        <h2>{beach.name}</h2>
        <p><strong>Water Quality:</strong> {beach.quality}</p>
        <p>{beach.description}</p>
        <p><strong>Temperature:</strong> {beach.temperature}</p>
        <p><strong>Wind Speed:</strong> {beach.windSpeed}</p>
        <p><strong>Fun Facts:</strong> {beach.funFacts}</p>

        <div>
          <h3>Add a Report</h3>
          {loggedIn ? (
            <div className="report-form">
              <textarea
                value={report}
                onChange={(e) => setReport(e.target.value)}
                placeholder="Type your report here..."
              />
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
              />
              <input
                type="text"
                value={reportSource}
                onChange={(e) => setReportSource(e.target.value)}
                placeholder="Source of the report"
              />
              <button onClick={handleSubmit}>Submit Report</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          ) : (
            <p className="login-prompt">You are not logged in. Please log in.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeachDetails;
