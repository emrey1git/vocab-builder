import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; 

import getOwnWords from "../api/wordService.js"; 
import ProgressBar from "../components/ProgressBar.jsx";
import WellDoneModal from "../components/WellDoneModal.jsx";
import ukFlag from "../assets/united kingdom.png";
import uaFlag from "../assets/ukraine (1).png";
import { toast } from "react-toastify";
import "./css/training.css";

const TrainingPage = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showWellDone, setShowWellDone] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchWords = async () => {
    try {
      setLoading(true);
      
      const data = await getOwnWords(); 
      const results = data.results || [];
      setWords(results);
    } catch (error) {
      console.error("Yükleme hatası:", error);
      toast.error("Kelimeler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;


  const handleNext = () => {
    const newAnswer = { word_id: currentWord?._id, answer: "seen" };
    setAnswers((prev) => [...prev, newAnswer]);
    
    if (!isLastWord) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    const finalAnswers = [...answers, { word_id: currentWord?._id, answer: "seen" }];
    try {
   
      await axiosInstance.post("/words/answers", { answers: finalAnswers });
      setShowWellDone(true);
    } catch (error) {
      
      setShowWellDone(true);
    }
  };

  if (loading) return <div className="loader">Yükleniyor...</div>;

  if (words.length === 0) {
    return (
      <div className="training-page">
        <div className="training-empty">
          <h3>Sözlüğünde kelime bulunamadı.</h3>
          <button className="btn-save" onClick={() => navigate("/dictionary")}>Kelime Ekle</button>
        </div>
      </div>
    );
  }

  return (
    <div className="training-page">
      <ProgressBar answered={answers.length} total={words.length} />
      
      <div className="training-card">
   
        <div className="card-side input-side">
          <div>
            <div className="lang-label">
              <img src={uaFlag} className="flag-icon" alt="UA" />
              <span>Ukrainian</span>
            </div>
         
            <h3>{currentWord?.ua}</h3> 
          </div>
          
          {!isLastWord ? (
            <button className="next-btn" onClick={handleNext}>Next →</button>
          ) : (
            <button className="submit-btn" onClick={handleSubmit}>Finish</button>
          )}
        </div>
        
        <div className="divider"></div>

    
        <div className="card-side word-side">
          <div>
            <div className="lang-label">
              <img src={ukFlag} className="flag-icon" alt="EN" />
              <span>English</span>
            </div>
          
            <h3>{currentWord?.en}</h3>
          </div>
        </div>
      </div>

      <div className="footer-actions">
        <button className="btn-save" onClick={handleSubmit}>Save </button>
        <button className="btn-cancel" onClick={() => navigate("/dictionary")}>Cancel</button>
      </div>

      {showWellDone && (
        <WellDoneModal onClose={() => navigate("/dictionary")} />
      )}
    </div>
  );
};

export default TrainingPage;