import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTrainingWords } from "../api/wordService.js";
import AddWordModal from "../components/AddWordModal.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import WellDoneModal from "../components/WellDoneModal.jsx";
import { toast } from "react-toastify";
import "./css/training.css";

const TrainingPage = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showWellDone, setShowWellDone] = useState(false); 

  useEffect(() => {
  }, []);

  const fetchWords = async () => {
    try {
      const data = await getTrainingWords();
      console.log("[Training] API Response:", data);
      const results = Array.isArray(data) ? data : (data && data.tasks) ? data.tasks : (data && data.results) ? data.results : [];
      console.log("[Training] Extracted words count:", results.length);
      setWords(results);
    } catch (error) {
      console.error("[Training] Error fetching words:", error);
      toast.error("Could not load training data.");
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;

  const handleNext = () => {
    if (userInput.trim()) {
      setAnswers([...answers, { word_id: currentWord._id, answer: userInput }]);
    }
    if (!isLastWord) {
      setCurrentIndex(currentIndex + 1);
      setUserInput("");
    }
  };

  const handleSubmit = async () => {
    if (userInput.trim()) {
      setAnswers([...answers, { word_id: currentWord._id, answer: userInput }]);
    }
    
    if (answers.length === 0 && !userInput.trim()) {
      toast.error("Please answer at least one question!");
      return;
    }

    try {
      const payload = answers.length > 0 ? answers : [{ word_id: currentWord._id, answer: userInput }];
      await fetch("/api/learn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: payload }),
      });
      setShowWellDone(true);
    } catch (error) {
      toast.error("Failed to save progress. Please try again.");
      navigate("/dictionary");
    }
  };

  return (
    <div className="training-page">
     
      {isOpen && <AddWordModal close={() => setIsOpen(false)} getWords={fetchWords} />}

      {words.length === 0 ? (
        
        <div className="training-empty">
          <div className="empty-content">
            <h3>You don't have a single word to learn right now.</h3>
            <p>Please create or add a word to start the workout.</p>
            <div className="footer-actions">
              <button className="btn-save" onClick={() => navigate("/dictionary", { state: { openModal: true } })}>Add word</button>
              <button className="btn-cancel">Cancel</button>
            </div>
          </div>
          <div className="progress-circle-container">
            <span className="progress-text">A+</span>
          </div>
        </div>
      ) : (
        
        <>
          <ProgressBar answered={answers.length} total={words.length} />
          
          <div className="training-card">
            <div className="card-side word-side">
              <div>
                <div className="lang-label">
                  <img src="/en-flag.png" className="flag-icon" alt="EN" />
                  <span>English</span>
                </div>
                <h3>{currentWord?.en}</h3>
              </div>
            </div>
            
            <div className="divider"></div>

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
              {!isLastWord ? (
                <button className="next-btn" onClick={handleNext}>
                  Next →
                </button>
              ) : (
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div>
          </div>

          <div className="footer-actions">
            <button className="btn-save" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn-cancel" onClick={() => navigate("/dictionary")}>
              Cancel
            </button>
          </div>

          {showWellDone && (
            <WellDoneModal 
              answered={answers.length} 
              total={words.length}
              onClose={() => navigate("/dictionary")}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TrainingPage;