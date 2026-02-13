import React from "react";
import "./css/WellDoneModal.css";
import bookImage from "/open orange book floating.png";

const WellDoneModal = ({ answers, onClose }) => {

  const correctOnes = answers.filter(a => a.task.toLowerCase().trim() === a.ua.toLowerCase().trim());
  const mistakes = answers.filter(a => a.task.toLowerCase().trim() !== a.ua.toLowerCase().trim());

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content well-done-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>

        <div className="well-done-header">
          <h2>Results</h2>
          
        </div>
        
        <div className="well-done-container">
          <div className="results-columns">
         
            <div className="results-column">
              <p className="column-title">Correct answers:</p>
              <div className="word-list">
                {correctOnes.map((a, i) => (
                  <span key={i} className="word-item">{a.en}</span>
                ))}
              </div>
            </div>

            <div className="results-column">
              <p className="column-title">Mistakes:</p>
              <div className="word-list">
                {mistakes.map((a, i) => (
                  <span key={i} className="word-item">{a.en}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="book-image-container">
            <img src={bookImage} alt="Results" className="book-image" />
          </div>
        </div>

        <div className="well-done-footer">
          <button className="btn-save" onClick={onClose}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default WellDoneModal;