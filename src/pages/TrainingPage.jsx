import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Kendi oluşturduğun servisleri ve instance'ı kullanıyoruz
import axiosInstance from "../api/axiosInstance"; 
import { getTrainingWords } from "../api/wordService.js";
import AddWordModal from "../components/AddWordModal.jsx";
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
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showWellDone, setShowWellDone] = useState(false);

  // Kelimeleri yükle
  const fetchWords = async () => {
    try {
      const data = await getTrainingWords();
      // Farklı veri yapılarına karşı (tasks/results/array) korumalı çekim
      const results = Array.isArray(data) ? data : (data?.tasks || data?.results || []);
      setWords(results);
    } catch (error) {
      console.error("[Training] Error:", error);
      toast.error("Could not load training data.");
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const currentWord = words[currentIndex];
  const isLastWord = currentIndex === words.length - 1;

  // "Next" butonuna basınca cevabı hafızaya at ve ilerle
  const handleNext = () => {
    if (userInput.trim() === "") {
      toast.warn("Please type an answer before skipping.");
      return;
    }

    const newAnswer = { word_id: currentWord._id, answer: userInput.trim() };
    setAnswers((prev) => [...prev, newAnswer]);
    
    if (!isLastWord) {
      setCurrentIndex(currentIndex + 1);
      setUserInput("");
    }
  };

  // Sonuçları sunucuya gönder
  const handleSubmit = async () => {
    // 1. Son kutuda yazılı olanı da listeye dahil et
    const currentAnswer = userInput.trim() 
      ? { word_id: currentWord._id, answer: userInput.trim() } 
      : null;

    const finalAnswers = currentAnswer ? [...answers, currentAnswer] : answers;

    if (finalAnswers.length === 0) {
      toast.error("Please answer at least one question!");
      return;
    }

    try {
      // fetch yerine axiosInstance kullanarak güvenliği (token vb.) sağlıyoruz
      // Not: Endpoint'in doğru olduğundan emin ol (/words/answers veya /api/learn)
      await axiosInstance.post("/words/answers", finalAnswers);
      
      // State'i en son haliyle güncelle ki Modal doğru sonuç göstersin
      setAnswers(finalAnswers);
      setShowWellDone(true);
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Failed to save progress. Try again.");
    }
  };

  return (
    <div className="training-page">
      {/* Kelime ekleme modalı */}
      {isOpen && <AddWordModal close={() => setIsOpen(false)} getWords={fetchWords} />}

      {words.length === 0 ? (
        <div className="training-empty">
          <div className="empty-content">
            <h3>You don't have a single word to learn right now.</h3>
            <p>Please create or add a word to start the workout.</p>
            <div className="footer-actions">
              <button className="btn-save" onClick={() => setIsOpen(true)}>Add word</button>
              <button className="btn-cancel" onClick={() => navigate("/dictionary")}>Cancel</button>
            </div>
          </div>
          <div className="progress-circle-container">
            <span className="progress-text">A+</span>
          </div>
        </div>
      ) : (
        <>
          {/* Cevaplanan kelime sayısına göre progress bar */}
          <ProgressBar answered={answers.length} total={words.length} />
          
          <div className="training-card">
            {/* Giriş Tarafı (Input) */}
            <div className="card-side input-side">
              <div>
                <div className="lang-label">
                  <img src={uaFlag} className="flag-icon" alt="UA" />
                  <span>Ukrainian</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Введіть переклад" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (!isLastWord ? handleNext() : handleSubmit())}
                />
              </div>
              
              {!isLastWord ? (
                <button className="next-btn" onClick={handleNext}>Next →</button>
              ) : (
                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
              )}
            </div>
            
            <div className="divider"></div>

            {/* Soru Tarafı (English) */}
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
            <button className="btn-save" onClick={handleSubmit}>Submit</button>
            <button className="btn-cancel" onClick={() => navigate("/dictionary")}>Cancel</button>
          </div>

          {/* Başarı Modalı */}
          {showWellDone && (
            <WellDoneModal 
              answers={answers}
              words={words}
              onClose={() => navigate("/dictionary")}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TrainingPage;