import React, { useEffect, useState } from 'react';
import './ReportPage.css';
import axios from 'axios';

const ReportPageComponent: React.FC = () => {
  const [selectedBeach, setSelectedBeach] = useState<string>(''); // Store the selected beach name
  const [report, setReport] = useState('');
  const [source, setSource] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  type Beach = {
    id: number;
    name: string;
  }

  const [beaches, setBeaches] = useState<Beach[]>([]);

  useEffect(() => {
    // Fetch the beach details
    const fetchBeachDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/beaches/');
        setBeaches(response.data.map((beach: { name: string, id: number }) => {
          return { name: beach.name, id: beach.id };
        }));
      } catch (error) {
        console.error('Error fetching beaches:', error);
      }
    };

    fetchBeachDetails();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Find the beach object based on the selected beach name
    const selectedBeachObj = beaches.find(beach => beach.name === selectedBeach);

    // Check if both a beach is selected and a rating is provided
    if (!selectedBeachObj) {
      alert('Please select a beach');
      return; // Exit the function if conditions aren't met
    }

    try {
      // Make a POST request to submit the report data to the backend
      await axios.post(`http://127.0.0.1:8000/api/beaches/${selectedBeachObj.id}/reports/`, {
        beach: selectedBeachObj.id, // The selected beach id
        detail: report, // The report text
        source: source, // Optional source URL provided by the user
      });

      // Reset the form fields after successful submission
      setReport('');
      setSelectedBeach('');
      setSource('');

      // Show a success message for 3 seconds
      setSuccessMessage('Report submitted successfully');
      setTimeout(() => {
        setSuccessMessage(''); // Clear the message after 3 seconds
      }, 3000);
    } catch (error) {
      // Log the error in case of a failed submission
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className="report-page">
      <h2>Submit a Beach Report</h2>
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Show success message */}

      <form onSubmit={handleSubmit} className="report-form">
        <label className="form-label">Select Beach:</label>
        <select
          value={selectedBeach}
          onChange={(e) => setSelectedBeach(e.target.value)} // Store the beach name as a string
          required
          className="form-select"
        >
          <option value="">Select a beach</option>
          {beaches.map((beach) => (
            <option key={beach.id} value={beach.name}>
              {beach.name}
            </option>
          ))}
        </select>

        <label className="form-label">Source (if applicable):</label>
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Enter the url of the source"
          className="form-textarea"
        />

        <label className="form-label">Report:</label>
        <textarea
          value={report}
          onChange={(e) => setReport(e.target.value)}
          placeholder="Enter your report..."
          required
          className="form-textarea"
        />

        <button type="submit" className="submit-button">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportPageComponent;
