import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuSearch,
  LuPencil,
  LuTrash2,
  LuPlus,
  LuArrowRight,
} from "react-icons/lu";
import wordServices from "../api/wordService.js";
import WordsTable from "../components/WordsTable.jsx";

const Dictionary = () => {
  const [words, setWords] = useState([]);

  const getWords = async () => {
    try {
      const data = await wordServices();
      setWords(data.results || []);
    } catch (error) {
      console.error("Error occurred while loading words:", error);
    }
  };

  const deleteWord = (id) => {
    console.log("Word ID to be deleted:", id);
  };

  useEffect(() => {
    getWords();
  }, []);

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

          <select className="category-select">
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

        <div className="filters-right">
          <div className="to-study">
            To study:{" "}
            <span className="study-count">
              {words.filter((w) => w.progress < 100).length}
            </span>
          </div>

          <button className="add-word-btn">
            Add word <LuPlus className="plus-icon" />
          </button>

          <Link to="/training" className="train-link">
            Train oneself <LuArrowRight className="arrow-icon" />
          </Link>
        </div>
      </div>

      <WordsTable
        words={words}
        renderActions={(word) => (
          <div className="action-buttons">
            <button onClick={() => console.log("Edit word ID:", word._id)}>
              <LuPencil />
            </button>
            <button onClick={() => deleteWord(word._id)}>
              <LuTrash2 />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default Dictionary;