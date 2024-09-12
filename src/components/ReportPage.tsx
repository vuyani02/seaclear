import React, { useState } from 'react';
import './ReportPage.css';

const ReportPageComponent: React.FC = () => {
  const [selectedBeach, setSelectedBeach] = useState('');
  const [rating, setRating] = useState<number | null>(null); // Store the user's rating
  const [hoverRating, setHoverRating] = useState<number | null>(null); // For hover effect
  const [report, setReport] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const beaches = ['Beach 1', 'Beach 2', 'Beach 3']; // Add available beaches here

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBeach || rating === null) {
      alert('Please select a beach and provide a rating.');
      return; // Ensure both a beach is selected and a rating is provided
    }

    // Get stored data for the selected beach or initialize new data
    const storedData = localStorage.getItem(selectedBeach);
    const parsedData = storedData ? JSON.parse(storedData) : { reports: [], ratings: [] };

    // Update the data with the new report and rating
    const updatedData = {
      ...parsedData,
      reports: [...parsedData.reports, report],
      ratings: [...parsedData.ratings, rating],
    };

    // Calculate the average rating
    const totalRatings = updatedData.ratings.reduce((sum: number, current: number) => sum + current, 0);
    const averageRating = totalRatings / updatedData.ratings.length;

    // Save updated data and average rating in localStorage
    localStorage.setItem(selectedBeach, JSON.stringify({ ...updatedData, averageRating }));

    // Reset the form fields
    setReport('');
    setRating(null); // Clear the rating
    setHoverRating(null); // Clear the hover effect
    setSelectedBeach('');
    setSuccessMessage('Report submitted successfully');

    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="report-page">
      <h2>Submit a Beach Report</h2>
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Show success message */}

      <form onSubmit={handleSubmit} className="report-form">
        <label className="form-label">Select Beach:</label>
        <select
          value={selectedBeach}
          onChange={(e) => setSelectedBeach(e.target.value)}
          required
          className="form-select"
        >
          <option value="">Select a beach</option>
          {beaches.map((beach, index) => (
            <option key={index} value={beach}>{beach}</option>
          ))}
        </select>

        <label className="form-label">Rate the Beach (out of 5):</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${rating && rating >= star ? 'filled' : ''} ${hoverRating && hoverRating >= star ? 'hovered' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
            >
              ★
            </span>
          ))}
        </div>

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
