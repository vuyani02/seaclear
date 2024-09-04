import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPageComponent.css';

interface AdminPageComponentProps {
  setIsLoggedIn: (value: boolean) => void;
  setIsAdmin: (value: boolean) => void;
}

const AdminPageComponent: React.FC<AdminPageComponentProps> = ({ setIsLoggedIn, setIsAdmin }) => {
  const [selectedBeach, setSelectedBeach] = useState<string>('');
  const [beachDetails, setBeachDetails] = useState({
    quality: '',
    temperature: '',
    windSpeed: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedBeach) {
      const storedData = localStorage.getItem(selectedBeach);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setBeachDetails({
          quality: parsedData.quality || '',
          temperature: parsedData.temperature || '',
          windSpeed: parsedData.windSpeed || '',
        });
      } else {
        // If no data found for the selected beach, clear beach details
        setBeachDetails({
          quality: '',
          temperature: '',
          windSpeed: '',
        });
      }
    }
  }, [selectedBeach]);

  const handleUpdate = () => {
    if (selectedBeach) {
      const updatedBeach = {
        quality: beachDetails.quality,
        temperature: beachDetails.temperature,
        windSpeed: beachDetails.windSpeed,
      };
      localStorage.setItem(selectedBeach, JSON.stringify(updatedBeach));
      alert('Beach details updated successfully!');
    }
  };

  const handleLogout = () => {
    // Perform logout actions
    setIsLoggedIn(false);
    setIsAdmin(false); // Clear admin state

    // Redirect to the homepage
    navigate('/');
  };

  return (
    <div className="admin-page">
      <h2>Admin Interface</h2>
      <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Select Beach:
          <select
            value={selectedBeach}
            onChange={(e) => setSelectedBeach(e.target.value)}
            className="admin-select"
          >
            <option value="">Select a beach</option>
            <option value="Beach 1">Beach 1</option>
            <option value="Beach 2">Beach 2</option>
            {/* Add more beach options dynamically */}
          </select>
        </label>
        <br />
        <label>
          Quality:
          <input
            type="text"
            value={beachDetails.quality}
            onChange={(e) => setBeachDetails((prev) => ({ ...prev, quality: e.target.value }))}
            className="admin-input"
          />
        </label>
        <br />
        <label>
          Temperature:
          <input
            type="text"
            value={beachDetails.temperature}
            onChange={(e) => setBeachDetails((prev) => ({ ...prev, temperature: e.target.value }))}
            className="admin-input"
          />
        </label>
        <br />
        <label>
          Wind Speed:
          <input
            type="text"
            value={beachDetails.windSpeed}
            onChange={(e) => setBeachDetails((prev) => ({ ...prev, windSpeed: e.target.value }))}
            className="admin-input"
          />
        </label>
        <br />
        <button type="button" onClick={handleUpdate} className="admin-button">
          Update Beach Details
        </button>
      </form>
      <button onClick={handleLogout} className="admin-logout-button">
        Logout
      </button>
    </div>
  );
};

export default AdminPageComponent;
