import React from 'react';
import { useParams } from 'react-router-dom';
import { Beach } from '../types/types';
import HeaderComponent from './HeaderComponent';
import './BeachDetailsComponent.css'; // Import the CSS file for styling

const BeachDetailsComponent: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  
  // Example beach details (replace with actual data fetching)
  const beach: Beach = {
    name: name || '',
    quality: 'Good',
    description: 'A beautiful beach with golden sands and clear waters.',
    temperature: '22°C',
    windSpeed: '10 km/h',
    funFacts: 'Great for swimming and sunbathing.',
    sources: ['Source 1', 'Source 2'],
    comments: ['Nice place!', 'Very clean and friendly.']
  };

  return (
    <div className="beach-details">
      <HeaderComponent />
      <div className="beach-details-content">
        <h2 className="beach-name">{beach.name}</h2>
        <p className="beach-description">{beach.description}</p>
        <div className="beach-details-info">
          <div className="info-item">
            <strong>Quality:</strong> {beach.quality}
          </div>
          <div className="info-item">
            <strong>Temperature:</strong> {beach.temperature}
          </div>
          <div className="info-item">
            <strong>Wind Speed:</strong> {beach.windSpeed}
          </div>
          <div className="info-item">
            <strong>Fun Facts:</strong> {beach.funFacts}
          </div>
        </div>
        <div className="beach-sources">
          <h3>Sources:</h3>
          <ul>
            {beach.sources.map((source, index) => (
              <li key={index}>{source}</li>
            ))}
          </ul>
        </div>
        <div className="beach-comments">
          <h3>Comments:</h3>
          <ul>
            {beach.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BeachDetailsComponent;
