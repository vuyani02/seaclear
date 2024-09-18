import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Beach } from '../types/types';
import './BeachDetailsComponent.css';
 
const BeachDetailsComponent: React.FC = () => {
  const { urlName } = useParams<{ urlName: string }>();
  const [beach, setBeach] = useState<Beach>({
    id: 0,
    name: '',
    urlName: urlName || '',
    location: '',
    status: '',
    description: '',
    current_temperature: 0,
    current_rain: '',
    current_wind_speed: 0,
    saturday_temperature: 0,
    saturday_rain: '',
    saturday_wind_speed: 0,
    sunday_temperature: 0,
    sunday_rain: '',
    sunday_wind_speed: 0,
    picture: '',
    funFacts: '',
    comments: [],
  });
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<string[]>([]); // Store comments from the database
  const navigate = useNavigate();
 
  // Fetch the beach details from the API
  useEffect(() => {
    const fetchBeachDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/beaches/${urlName}/`);
        const beachData = response.data;
       
        // Set the beach details to the state
        setBeach({
          id: beachData.id,
          name: beachData.name,
          urlName: beachData.urlName,
          location: beachData.location,
          status: beachData.status,
          description: beachData.description,
          current_temperature: beachData.current_temperature,
          current_rain: beachData.current_rain,
          current_wind_speed: beachData.current_wind_speed,
          saturday_temperature: beachData.saturday_temperature,
          saturday_rain: beachData.saturday_rain,
          saturday_wind_speed: beachData.saturday_wind_speed,
          sunday_temperature: beachData.sunday_temperature,
          sunday_rain: beachData.sunday_rain,
          sunday_wind_speed: beachData.sunday_wind_speed,
          picture: beachData.picture,
          funFacts: beachData.funFacts,
          comments: [],
        });
 
        // Fetch the comments related to this beach
        const commentsResponse = await axios.get(`http://127.0.0.1:8000/api/beaches/${beachData.id}/comments/`);
        setComments(commentsResponse.data.map((comment: { user_name: string, text: string, timestamp: string }) => {
          return `${comment.user_name}: ${comment.text} ${new Date(comment.timestamp).toLocaleString()}`;
        }));
      } catch (error) {
        console.error('Error fetching beach details:', error);
      }
    };
 
    if (urlName) {
      fetchBeachDetails();
    }
  }, [urlName]); // The effect will run when the beach name changes
 
  // Handle new comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    if (newComment.trim() === '') return;
 
    try {
      // Post the new comment to the backend
      await axios.post(`http://127.0.0.1:8000/api/beaches/${beach.id}/comments/`, { text: newComment });
 
      // After posting, fetch comments again to reflect the new one
      const response = await axios.get(`http://127.0.0.1:8000/api/beaches/${beach.id}/comments/`);
     
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
        {beach.picture && (
        <img src={beach.picture} alt={`${beach.name} beach`} className="beach-picture" />
      )}
        <p className="beach-description">{beach.description}</p>
        <div className="beach-details-info">
          <div className="info-item">
            <strong>Quality:</strong> {beach.status}
          </div>
          <div className="info-item">
            <strong>Location:</strong> {beach.location}
          </div>
          <div className="info-item">
            <strong>Current temperature:</strong> {beach.current_temperature + "°C"}
          </div>
          <div className="info-item">
            <strong>Current rain:</strong> {beach.current_rain}
          </div>
          <div className="info-item">
            <strong>Current wind Speed:</strong> {beach.current_wind_speed + " km/h"}
          </div>
          <div className="info-item">
            <strong>Saturday temperature:</strong> {beach.saturday_temperature + "°C"}
          </div>
          <div className="info-item">
            <strong>Saturday rain:</strong> {beach.saturday_rain}
          </div>
          <div className="info-item">
            <strong>Saturday wind speed:</strong> {beach.saturday_wind_speed + " km/h"}
          </div>
          <div className="info-item">
            <strong>Sunday temperature:</strong> {beach.sunday_temperature + "°C"}
          </div>
          <div className="info-item">
            <strong>Sunday rain:</strong> {beach.sunday_rain}
          </div>
          <div className="info-item">
            <strong>Sunday wind speed:</strong> {beach.sunday_wind_speed + " km/h"}
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