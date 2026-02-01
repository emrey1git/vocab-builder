import React from "react";
import "./css/WellDoneModal.css";

const WellDoneModal = ({ answered, total, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content well-done-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Well Done! 🎉</h2>
        </div>
        
        <div className="well-done-stats">
          <div className="stat-item">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{answered}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total</span>
            <span className="stat-value">{total}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Accuracy</span>
            <span className="stat-value">{total > 0 ? Math.round((answered / total) * 100) : 0}%</span>
          </div>
        </div>

        <p className="well-done-message">
          Great job! You've completed your training session.
        </p>

        <button className="btn-close" onClick={onClose}>
          Back to Dictionary
        </button>
      </div>
    </div>
  );
};

export default WellDoneModal;
