import React from "react";
import { Link } from "react-router-dom";
import { LuSearch, LuArrowUpRight } from "react-icons/lu";
import "./css/dashboard.css";

const Dashboard = ({ 
  isRecommend = false, 
  statsCount = 0, 
  onSearch, 
  onCategoryChange, 
  onVerbTypeChange,
  selectedCategory,
  selectedVerbType 
}) => {
  return (
    <div className="dashboard-container">
      <div className="filters-group">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Find the word"
            className="search-input"
            onChange={(e) => onSearch(e.target.value)}
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
          To study: <span className="stats-number">{statsCount}</span>
        </p>
        <Link to="/training" className="train-link">
          Train oneself <LuArrowUpRight />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;