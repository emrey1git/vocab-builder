import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LuSearch, LuArrowUpRight } from "react-icons/lu";
import { getStatistics } from "../api/wordService.js";  
import "./css/dashboard.css";

const Dashboard = ({
  isRecommend = false,
  refreshTrigger, // Tetikleyiciyi buradan alıyoruz 🎯
  onSearch,
  onCategoryChange,
  onVerbTypeChange,
  selectedCategory,
  selectedVerbType,
}) => {
  const [liveStats, setLiveStats] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatistics();
        setLiveStats(data.totalCount || 0);
      } catch (err) {
        console.error("Dashboard stats error:", err);
      }
    };
    fetchStats();
  }, [refreshTrigger]); // Tetikleyici değiştiğinde rakamı tazele! ✨

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  return (
    <div className="dashboard-container">
      <div className="filters-group">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Find the word"
            className="search-input"
            onChange={handleSearchChange}
          />
          <LuSearch className="search-icon" />
        </div>

        <div className="select-wrapper">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="category-select"
          >
            <option value="">Categories</option>
            <option value="verb">Verb</option>
            <option value="participle">Participle</option>
            <option value="noun">Noun</option>
            <option value="adjective">Adjective</option>
            <option value="pronoun">Pronoun</option>
            <option value="numerals">Numerals</option>
            <option value="adverb">Adverb</option>
            <option value="preposition">Preposition</option>
            <option value="conjuction">Conjuction</option>
            <option value="phrasalVerb">Phrasal verb</option>
            <option value="functionalPhrase">Functional phrase</option>
          </select>
        </div>

        {selectedCategory === "verb" && (
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="verbType"
                value="regular"
                checked={selectedVerbType === "regular"}
                onChange={(e) => onVerbTypeChange(e.target.value)}
              />
              <span className="radio-custom"></span>
              <span className="radio-text">Regular</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="verbType"
                value="irregular"
                checked={selectedVerbType === "irregular"}
                onChange={(e) => onVerbTypeChange(e.target.value)}
              />
              <span className="radio-custom"></span>
              <span className="radio-text">Irregular</span>
            </label>
          </div>
        )}
      </div>

      <div className="stats-group">
        <p className="to-study-text">
          To study: <span className="stats-number">{liveStats}</span>
        </p>
        <Link to="/training" className="train-link">
          Train oneself <LuArrowUpRight />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;