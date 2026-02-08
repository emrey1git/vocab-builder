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
  const [userAnswer, setUserAnswer] = useState(""); // Senin yazdığın Ukraynaca kelime
  const [answers, setAnswers] = useState([]); // Tüm cevapların biriktiği liste
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
   
    if (!userAnswer.trim()) {
      toast.warning("Please enter a translation before moving to the next word! ✍️", {
        position: "top-right",
        autoClose: 3000,
      });
      return; 
    }

   
    const newAnswer = { 
      _id: currentWord?._id,
      en: currentWord?.en, 
      ua: currentWord?.ua, 
      task: userAnswer.trim() // Senin yazdığın cevap
    };
    
    setAnswers((prev) => [...prev, newAnswer]);
    setUserAnswer(""); // Kutuyu temizle

    if (!isLastWord) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    // Son kelimeyi de listeye ekle (eğer yazılmışsa)
    const finalAnswer = { 
      _id: currentWord?._id, 
      en: currentWord?.en, 
      ua: currentWord?.ua, 
      task: userAnswer.trim() 
    };
    const finalAnswers = [...answers, finalAnswer];

    try {
      // Backend'e gönderiyoruz (ilerleme artsın diye)
      await axiosInstance.post("/words/answers", finalAnswers);
      // Modalı gösterirken biriktirdiğimiz tüm cevapları gönderiyoruz
      setAnswers(finalAnswers);
      setShowWellDone(true);
    } catch (error) {
      console.error("Gönderim hatası:", error);
      setAnswers(finalAnswers);
      setShowWellDone(true);
    }
  };

  if (loading) return <div className="loader">Yükleniyor...</div>;

  return (
    <div className="training-page">
      <ProgressBar answered={answers.length} total={words.length} />

      <div className="training-card">
        {/* SOL TARAF: Giriş Alanı (Ukrainian) */}
        <div className="card-side input-side">
          <div>
            <div className="lang-label">
              <img src={uaFlag} className="flag-icon" alt="UA" />
              <span>Ukrainian</span>
            </div>
            {/* FIGMA: Buraya Ukraynacasını yazıyorsun */}
            <input 
              type="text" 
              placeholder="Введіть переklad" 
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              autoFocus
            />
          </div>

          <div className="card-footer">
            {!isLastWord ? (
              <button className="next-btn" onClick={handleNext}>Next →</button>
            ) : (
              <button className="submit-btn" onClick={handleSubmit}>Finish</button>
            )}
          </div>
        </div>

        <div className="divider"></div>

        {/* SAĞ TARAF: Soru (English) */}
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
        <button className="btn-save" onClick={handleSubmit}>Save</button>
        <button className="btn-cancel" onClick={() => navigate("/dictionary")}>Cancel</button>
      </div>

      {showWellDone && (
        <WellDoneModal 
          onClose={() => navigate("/dictionary")} 
          answers={answers} 
        />
      )}
    </div>
  );
};

export default TrainingPage;