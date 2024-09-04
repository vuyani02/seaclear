import React from 'react';
import HeaderComponent from './HeaderComponent';
import './EducationalContentComponent.css'; // Import the CSS file for styling

const EducationalContentComponent: React.FC = () => {
  return (
    <div className="educational-content">
      <HeaderComponent />
      <div className="content-container">
        <h2>Educational Content</h2>
        <section className="section">
          <h3>Understanding Water Quality</h3>
          <p>
            Water quality is crucial for safe and enjoyable beach experiences. Key indicators include:
          </p>
          <ul>
            <li><strong>pH Level:</strong> Measures the acidity or alkalinity of the water. Ideal pH ranges from 6.5 to 8.5.</li>
            <li><strong>Temperature:</strong> Affects comfort and safety. Cold temperatures may deter swimming, while warmer temperatures can encourage it.</li>
            <li><strong>Contaminants:</strong> Check for pollutants like bacteria, chemicals, and debris that can impact health.</li>
          </ul>
        </section>
        <section className="section">
          <h3>Why Water Quality Matters</h3>
          <p>
            Good water quality ensures the safety of swimmers and preserves the beach environment. Regular monitoring helps prevent health issues and maintain a pleasant beach experience.
          </p>
        </section>
        <section className="section">
          <h3>How to Report Issues</h3>
          <p>
            If you notice any issues with water quality or other beach conditions, please use the 'Submit Report' feature on the beach details page. Ensure you're logged in to submit a report.
          </p>
        </section>
      </div>
    </div>
  );
};

export default EducationalContentComponent;
