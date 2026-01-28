import React, { useState, useEffect } from "react";
import { getTrainingWords } from "../api/wordService.js";
import { toast } from "react-toastify";
import "./css/training.css";

const TrainingPage = () => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTrainingWords();
        setWords(data.results || []);
      } catch (error) {
        toast.error("Could not load training data.");
      }
    };
    fetchTasks();
  }, []);

  if (words.length === 0) {
    return (
      <div className="training-page">
        <div className="training-empty">
          <div className="empty-content">
            <h3>You don't have a single word to learn right now.</h3>
            <p>Please create or add a word to start the workout.</p>
            <div className="footer-actions">
              <button className="btn-save">Add word</button>
              <button className="btn-cancel">Cancel</button>
            </div>
          </div>
          <div className="progress-circle-container">
            <span className="progress-text">A+</span>
          </div>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div className="training-page">
      <div className="training-card">
        <div className="card-side input-side">
          <div>
            <div className="lang-label">
              <img src="/ua-flag.png" className="flag-icon" alt="UA" />
              <span>Ukrainian</span>
            </div>
            <input 
              type="text" 
              placeholder="Введіть переклад" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <button className="next-btn" onClick={() => {
            setCurrentIndex(prev => (prev + 1) % words.length);
            setUserInput("");
          }}>
            Next →
          </button>
        </div>
        
        <div className="divider"></div>

        <div className="card-side word-side">
          <div>
            <div className="lang-label">
              <img src="/en-flag.png" className="flag-icon" alt="EN" />
              <span>English</span>
            </div>
            <h3>{currentWord?.en}</h3>
          </div>
        </div>
      </div>

      <div className="footer-actions">
        <button className="btn-save" onClick={() => toast.info("Check and Save logic needed")}>
          Save
        </button>
        <button className="btn-cancel">Cancel</button>
      </div>
    </div>
  );
};

export default TrainingPage;