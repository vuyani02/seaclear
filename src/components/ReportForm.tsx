import React from 'react';

type ReportFormProps = {
  newReport: string;
  reportDate: string;
  reportSource: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAddReport: () => void;
};

const ReportForm: React.FC<ReportFormProps> = ({ newReport, reportDate, reportSource, onChange, onAddReport }) => (
  <div className="report-form">
    <h3>Report an Issue</h3>
    <textarea
      name="newReport"
      value={newReport}
      onChange={onChange}
      placeholder="Type your report here..."
      className="comment-input"
    />
    <input
      type="date"
      name="reportDate"
      value={reportDate}
      onChange={onChange}
      className="input"
    />
    <input
      type="text"
      name="reportSource"
      value={reportSource}
      onChange={onChange}
      placeholder="Source of the report"
      className="input"
    />
    <button onClick={onAddReport} className="comment-button">Submit Report</button>
  </div>
);

export default ReportForm;
