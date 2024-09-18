import React, { useEffect, useState } from 'react';
import './EducationalContentComponent.css'; // Import the CSS file for styling
import axios from 'axios';

type tEducationContent = {
  title1: string;
  detail1: string;
  title2: string;
  detail2: string;
  source: string;
};

const EducationalContentComponent: React.FC = () => {
  const [educationalContent, setEducationalContent] = useState<tEducationContent[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const url = 'http://127.0.0.1:8000/api/'; // API URL

  useEffect(() => {
    axios
      .get(url + 'EducationalContent/') 
      .then((response) => {
        setEducationalContent(response.data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error('Failed to fetch educational content', error);
        setError('Unable to load educational content. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loader
  }

  if (error) {
    return <div>{error}</div>; // Error message
  }

  return (
    <div className="educational-content">
      <div className="content-container">
        <h2>Educational Content</h2>
        {educationalContent && educationalContent.length > 0 ? (
          educationalContent.map((section, index) => (
            <section className="section" key={index}>
              <h3>{section.title1}</h3>
              <p>{section.detail1}</p>
              <h3>{section.title2}</h3>
              <p>{section.detail2}</p>
              <h3>{"Source"}</h3>
              <p>{section.source}</p>
            </section>
          ))
        ) : (
          <p>No educational content found.</p>
        )}
      </div>
    </div>
  );
};

export default EducationalContentComponent;
