import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPageComponent.css';

const beaches = ['Beach 1', 'Beach 2', 'Beach 3']; // Sample list of beaches

const AdminPageComponent: React.FC = () => {
  const [selectedBeach, setSelectedBeach] = useState(beaches[0]);
  const [newQuality, setNewQuality] = useState('');
  const navigate = useNavigate();

  const handleUpdate = () => {
    // Here, you would typically send the updated quality to the server and update the database
    // For this example, we're using localStorage to simulate the update
    const beachData = JSON.parse(localStorage.getItem(selectedBeach) || '{}');
    beachData.quality = newQuality;
    localStorage.setItem(selectedBeach, JSON.stringify(beachData));

    alert(`Updated ${selectedBeach} with new water quality: ${newQuality}`);
  };

  const handleLogout = () => {
    // Clear admin session (this is just a simulation, in a real app, you'd clear session tokens, etc.)
    navigate('/');
  };

  return (
    <div className="admin-page">
      <h2>Admin Interface</h2>
      <div className="admin-controls">
        <label>
          Select Beach:
          <select value={selectedBeach} onChange={(e) => setSelectedBeach(e.target.value)}>
            {beaches.map((beach) => (
              <option key={beach} value={beach}>
                {beach}
              </option>
            ))}
          </select>
        </label>
        <label>
          New Water Quality:
          <input type="text" value={newQuality} onChange={(e) => setNewQuality(e.target.value)} />
        </label>
        <button onClick={handleUpdate}>Update Quality</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminPageComponent;
