import React from 'react';

const EducationalContentPage: React.FC = () => {
  return (
    <div className="educational-content">
      <h2>Educational Content about Water Quality</h2>
      <p>
        Water quality at beaches is crucial for public health and the environment. 
        Here are some important factors that influence water quality:
      </p>
      <ul>
        <li><strong>Bacteria Levels:</strong> High levels of bacteria can be harmful and indicate pollution.</li>
        <li><strong>pH Levels:</strong> The pH of water determines its acidity or alkalinity and affects marine life.</li>
        <li><strong>Temperature:</strong> Water temperature influences the growth of microorganisms and overall water health.</li>
        <li><strong>Pollutants:</strong> Chemicals, waste, and runoff can degrade water quality and harm ecosystems.</li>
      </ul>
      <p>
        Regular monitoring and reporting are vital for ensuring that beaches remain safe for everyone.
      </p>
    </div>
  );
};

export default EducationalContentPage;
