import React from "react";
import "./css/WellDoneModal.css";
import bookImage from "../assets/open orange book floating.png";

const WellDoneModal = ({ answers, total, onClose, words }) => {
  const getCorrectAnswers = () => {
    if (!answers || !words) return 0;
    return answers.filter((answer, idx) => {
      const word = words[idx];
      return word && answer.answer.toLowerCase().trim() === word.ua.toLowerCase().trim();
    }).length;
  };

  const correctCount = getCorrectAnswers();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content well-done-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        <div className="well-done-header">
          <h2>Results</h2>
          <p>Preview</p>
        </div>
        
        <div className="well-done-container">
          <div className="answers-list">
          {answers && words && answers.map((answer, idx) => {
            const word = words[idx];
            const isCorrect = word && answer.answer.toLowerCase().trim() === word.ua.toLowerCase().trim();
            return (
              <div key={idx} className="answer-item">
                <div className="answer-word">
                  <span className="en-word">{word?.en}</span>
                </div>
                <div className="answer-result">
                  <span className={`result-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                  <div className="answer-details">
                    <span className="correct-answer">{word?.ua}</span>
                    {!isCorrect && <span className="user-answer">Your answer: {answer.answer}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

          <div className="book-image-container">
            <img src={bookImage} alt="Open book" className="book-image" />
          </div>
        </div>

        <div className="well-done-footer">
          <button className="btn-save" onClick={onClose}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellDoneModal;
