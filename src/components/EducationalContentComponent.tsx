import React from 'react';
//import HeaderComponent from './HeaderComponent';
import './EducationalContentComponent.css'; // Import the CSS file for styling

const EducationalContentComponent: React.FC = () => {
  return (
    <div className="educational-content">
      {/* <HeaderComponent /> */}
      <div className="content-container">
        <h2>Educational Content</h2>
        
        {/* Understanding Water Quality Section */}
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
        
        {/* Why Water Quality Matters Section */}
        <section className="section">
          <h3>Why Water Quality Matters</h3>
          <p>
            Good water quality ensures the safety of swimmers and preserves the beach environment. It helps prevent health issues such as skin irritations, infections, and waterborne illnesses. Regular monitoring helps ensure that water remains safe for recreational activities like swimming and surfing.
          </p>
        </section>

        {/* How to Check Water Quality Yourself Section */}
        <section className="section">
          <h3>How to Check Water Quality Yourself</h3>
          <p>
            You can perform basic checks for water quality yourself by following these steps:
          </p>
          <ul>
            <li><strong>Visual Inspection:</strong> Look for clear water, free from debris and visible pollutants. Algae blooms or murky water may indicate contamination.</li>
            <li><strong>Smell:</strong> Water that smells bad (like rotten eggs) may be contaminated with chemicals or bacteria.</li>
            <li><strong>Temperature:</strong> If the water feels unusually cold or warm, it could affect your comfort and safety.</li>
            <li><strong>Use a Home Test Kit:</strong> You can purchase water testing kits to check for pH levels, bacteria, and other contaminants. These kits are easy to use and provide quick results.</li>
          </ul>
          <p>
            If you suspect any issues, it's always best to check official sources or report it using our 'Submit Report' feature.
          </p>
        </section>

        {/* How to Report Issues Section */}
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
