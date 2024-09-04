import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Beach } from '../types/types';
import HeaderComponent from './HeaderComponent';
import './BeachDetailsComponent.css';

const BeachDetailsComponent: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [beach, setBeach] = useState<Beach>({
    name: name || '',
    quality: 'Good',
    description: 'A beautiful beach with golden sands and clear waters.',
    temperature: '22°C',
    windSpeed: '10 km/h',
    funFacts: 'Great for swimming and sunbathing.',
    sources: ['Source 1', 'Source 2'],
    comments: ['Nice place!', 'Very clean and friendly.']
  });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchBeachDetails = () => {
      const storedData = localStorage.getItem(name || '');
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        setBeach((prevState) => ({
          ...prevState,
          ...parsedData,
          name: name || prevState.name,
          description: parsedData.description || prevState.description,
          quality: parsedData.quality || prevState.quality,
          temperature: parsedData.temperature || prevState.temperature,
          windSpeed: parsedData.windSpeed || prevState.windSpeed,
          funFacts: parsedData.funFacts || prevState.funFacts,
          sources: parsedData.sources || prevState.sources,
          comments: parsedData.comments || prevState.comments,
        }));
      }
    };

    fetchBeachDetails();

    // Optional: Poll for changes if localStorage is updated from elsewhere
    const intervalId = setInterval(fetchBeachDetails, 1000); // Check every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [name]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newComment.trim() === '') return;

    const updatedComments = [...beach.comments, newComment];
    setBeach((prevState) => ({
      ...prevState,
      comments: updatedComments,
    }));

    // Save to local storage
    localStorage.setItem(name || '', JSON.stringify({ ...beach, comments: updatedComments }));

    setNewComment(''); // Clear the input after submission
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
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BeachDetailsComponent;
