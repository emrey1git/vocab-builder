import React, { useEffect, useState } from "react";
import { LuSearch, LuPlus } from "react-icons/lu";
import getOwnWords, { getRecommendedWords, addWordToDictionary as addWordService } from "../api/wordService.js";
import WordsTable from "../components/WordsTable.jsx";
import "./css/dictionary.css";

const RecommendPage = () => {
  const [words, setWords] = useState([]);

  const fetchRecommended = async () => {
    try {
      const ownData = await getOwnWords();
      const recData = await getRecommendedWords();
      const ownIds = (ownData || []).map(w => w._id);
      const filtered = (recData?.results || []).filter(word => !ownIds.includes(word._id));
      setWords(filtered);
    } catch (error) {
      console.error("Failed to fetch and filter words:", error);
    }
  };

  useEffect(() => {
    fetchRecommended();
  }, []);

  const handleAddWord = async (id) => {
    try {
      await addWordService(id);
      alert("Word successfully added to your dictionary!");
      const updatedWords = words.filter(w => w._id !== id);
      setWords(updatedWords);
    } catch (error) {
      console.error("Error adding word to dictionary:", error);
      alert("Failed to add word. Please try again.");
    }
  };

  return (
    <div className="dictionary-page">
      <div className="filters-container">
        <div className="filters-left">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Find the word"
              className="search-input"
            />
            <LuSearch className="search-icon" />
          </div>
        </div>
      </div>

      <WordsTable
        words={words}
        renderActions={(word) => (
          <button
            className="add-to-dict-btn"
            onClick={() => handleAddWord(word._id)}
          >
            Add to dictionary <LuPlus />
          </button>
        )}
      />
    </div>
  );
};

export default RecommendPage;