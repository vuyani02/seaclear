import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ReportPage.css'; // Import the CSS file for styling

const beaches = [
  { name: 'Beach 1', description: 'A lovely sandy beach.' },
  { name: 'Beach 2', description: 'A quiet and peaceful beach.' },
  // Add more beaches as needed
];

const ReportPage: React.FC = () => {
  const [selectedBeach, setSelectedBeach] = useState('');
  const [report, setReport] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedBeach.trim() === '' || report.trim() === '') return;

    // Save the report (e.g., send it to an API or store it locally)
    console.log(`Report for ${selectedBeach}: ${report}`);

    // Clear the form and show success message
    setSelectedBeach('');
    setReport('');
    setSuccessMessage('Report submitted successfully!');
  };

  return (
    <div className="report-page">
      <h2>Submit a Report</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="report-form">
        <label htmlFor="beach-select">Select Beach:</label>
        <select
          id="beach-select"
          value={selectedBeach}
          onChange={(e) => setSelectedBeach(e.target.value)}
        >
          <option value="">Select a beach</option>
          {beaches.map((beach) => (
            <option key={beach.name} value={beach.name}>
              {beach.name} - {beach.description}
            </option>
          ))}
        </select>
        <label htmlFor="report">Report:</label>
        <textarea
          id="report"
          value={report}
          onChange={(e) => setReport(e.target.value)}
          placeholder="Enter your report"
        />
        <button type="submit" className="submit-button">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportPage;
