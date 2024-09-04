import React from 'react';
import './ReportComponent.css';

type ReportProps = {
  loggedIn: boolean;
  newReport: string;
  reportDate: string;
  reportSource: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAddReport: () => void;
};

const ReportComponent: React.FC<ReportProps> = ({
  loggedIn, newReport, reportDate, reportSource, onChange, onAddReport
}) => {
  return loggedIn ? (
    <div className="report-section">
      <textarea
        name="newReport"
        value={newReport}
        onChange={onChange}
        placeholder="Submit a report"
        className="report-input"
      />
      <input
        type="date"
        name="reportDate"
        value={reportDate}
        onChange={onChange}
        className="report-date-input"
      />
      <input
        type="text"
        name="reportSource"
        value={reportSource}
        onChange={onChange}
        placeholder="Source of the report"
        className="report-source-input"
      />
      <button onClick={onAddReport} className="report-button">Submit Report</button>
    </div>
  ) : (
    <p>You must be logged in to submit a report.</p>
  );
};

export default ReportComponent;
