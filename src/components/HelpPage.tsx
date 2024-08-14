import React from 'react';
import './HelpPage.css'; // Import a CSS file for styling if needed

const HelpPage: React.FC = () => {
  return (
    <div className="help-page">
      <h1>Help & FAQ</h1>
      
      <div className="faq-item">
        <h2>How do I filter beaches on the map?</h2>
        <p>To filter beaches, use the filter options on the sidebar or the map page. Select the desired quality or temperature, and the map will update to show only the beaches that match your criteria.</p>
      </div>
      
      <div className="faq-item">
        <h2>Why are some beaches not showing on the map?</h2>
        <p>Beaches may not appear on the map if they do not meet the current filter criteria (e.g., quality or temperature). Check your filter settings to ensure they match the beaches you expect to see.</p>
      </div>
      
      <div className="faq-item">
        <h2>How can I report an issue with beach data?</h2>
        <p>To report an issue, you must be logged in. Navigate to the beach details page and use the 'Submit Report' option to provide details about the issue.</p>
      </div>
      
      <div className="faq-item">
        <h2>How do I create an account?</h2>
        <p>Click on the 'Login' button and then select 'Create an Account'. Fill in your username and password, and click 'Register' to create a new account.</p>
      </div>
      
      <div className="faq-item">
        <h2>How can I contact support?</h2>
        <p>If you need further assistance, please contact our support team at support@seaclear.com.</p>
      </div>
      
      <div className="faq-item">
        <h2>Where can I find the map legend?</h2>
        <p>The map legend can be found on the map page. It provides information about the map symbols and colors used to indicate beach quality and other features.</p>
      </div>
    </div>
  );
};

export default HelpPage;
