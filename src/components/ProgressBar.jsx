import React from "react";
import "./css/ProgressBar.css";

const ProgressBar = ({ answered, total }) => {
  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;

  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <span className="progress-label">Progress</span>
        <span className="progress-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
