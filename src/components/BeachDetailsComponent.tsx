import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Beach } from '../types/types';
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
    comments: [],
  });
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const [comments, setComments] = useState<string[]>([]); // Store comments from the database

  useEffect(() => {
    // Fetch the beach details (simulated from local storage for now)
    const fetchBeachDetails = () => {
      const storedData = localStorage.getItem(name || '');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setBeach((prevState) => ({
          ...prevState,
          ...parsedData,
        }));
      }
    };

    fetchBeachDetails();

    // Fetch comments from the backend
    const fetchComments = async () => {
      try {
        axios.get(`http://127.0.0.1:8000/api/beaches/2/comments/`).then((response) => {
          setComments(response.data.map((comment: { user_name: string, text: string, timestamp: string }) => {
            return `${comment.user_name}: ${comment.text} ${new Date(comment.timestamp).toLocaleString()}`;
          }));
        });
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [name]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (newComment.trim() === '') return;
  
    try {
      // Post the new comment to the backend
      await axios.post(`http://127.0.0.1:8000/api/beaches/2/comments/`, { text: newComment });
  
      // After posting, fetch comments again to reflect the new one
      const response = await axios.get(`http://127.0.0.1:8000/api/beaches/2/comments/`);
      
      // Update the comments state with the new list
      setComments(response.data.map((comment: { user_name: string, text: string, timestamp: string }) => {
        return `${comment.user_name}: ${comment.text} ${new Date(comment.timestamp).toLocaleString()}`;
      }));
      
      setNewComment(''); // Clear the input after submission
  
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  
  return (
    <div className="beach-details">
      <button className="back-button" onClick={() => navigate('/')}>
        &larr; Back to Home
      </button>
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
        <div className="beach-comments">
          <h3>Comments:</h3>
          <ul>
            {comments.map((comment, index) => (
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
