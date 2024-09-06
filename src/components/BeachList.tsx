import React from 'react';
import BeachDetails from './BeachDetails';

interface Beach {
  name: string;
  quality: string;
  description: string;
  temperature: string;
  windSpeed: string;
  funFacts: string;
  sources: string[];
  comments: string[];
}

interface BeachListProps {
  beaches: Beach[];
  loggedIn: boolean;
  onReportSubmit: (report: string, date: string, source: string) => void;
  onLoginClick: () => void;
}

const BeachList: React.FC<BeachListProps> = ({
  beaches,
  loggedIn,
  onReportSubmit,
  onLoginClick,
}) => {
  return (
    <div className="beach-list">
      {beaches.map((beach, index) => (
        <BeachDetails
          key={index}
          beach={beach}
          loggedIn={loggedIn}
          onReportSubmit={onReportSubmit}
          onLoginClick={onLoginClick}
        />
      ))}
    </div>
  );
};

export default BeachList;
