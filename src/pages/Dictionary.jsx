import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuSearch, LuPencil, LuTrash2, LuPlus, LuArrowRight } from "react-icons/lu";
import wordServices, { deleteWordFromServer } from "../api/wordService.js";
import WordsTable from "../components/WordsTable.jsx";
import AddWordModal from "../components/AddWordModal.jsx"; 
import { toast } from "react-toastify";

const Dictionary = () => {
  const location = useLocation();
  const [words, setWords] = useState([]);
  const [isOpen, setIsOpen] = useState(location.state?.openModal || false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({ totalPages: 1, perPage: 10 });

  const getWords = async (page = 1) => {
    try {
      const data = await wordServices();
      const results = Array.isArray(data) ? data : (data && Array.isArray(data.results)) ? data.results : [];
      const perPage = 7;
      setWords(results);
      setPaginationInfo({ perPage });
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    const onWordsUpdated = () => {
      getWords();
    };
    window.addEventListener("wordsUpdated", onWordsUpdated);
    return () => {
      window.removeEventListener("wordsUpdated", onWordsUpdated);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      getWords(1);
    }
  }, [isOpen]);

  return (
    <div className="dictionary-page">
      <div className="filters-container">
       
        <div className="filters-left">
          <div className="search-wrapper">
            <input type="text" placeholder="Find the word" className="search-input" />
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
            To study: <span className="study-count">{words.filter(w => w.progress < 100).length}</span>
          </div>

          <button className="add-word-btn" onClick={() => setIsOpen(true)}>
            Add word <LuPlus className="plus-icon" />
          </button>

          <Link to="/training" className="train-link">
            Train oneself <LuArrowRight className="arrow-icon" />
          </Link>
        </div>
      </div>

      <WordsTable
        words={words.slice((currentPage - 1) * paginationInfo.perPage, currentPage * paginationInfo.perPage)}
        renderActions={(word) => (
          <div className="action-buttons">
            <button onClick={() => console.log("Edit:", word._id)}><LuPencil /></button>
            <button onClick={() => deleteWord(word._id)}><LuTrash2 /></button>
          </div>
        )}
      />

      <div className="pagination-container" style={{ display: words.length ? "flex" : "none", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        {(() => {
          const dynamicTotalPages = Math.max(1, Math.ceil(words.length / paginationInfo.perPage));
          return (
            <>
              <button
                className="page-btn"
                onClick={() => getWords(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              
              <div style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: dynamicTotalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`page-number-btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      padding: "6px 10px",
                      border: currentPage === page ? "2px solid #4CAF50" : "1px solid #ddd",
                      background: currentPage === page ? "#f0f0f0" : "#fff",
                      cursor: "pointer",
                      borderRadius: "4px",
                      fontWeight: currentPage === page ? "bold" : "normal",
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => Math.min(dynamicTotalPages, p + 1))}
                disabled={currentPage >= dynamicTotalPages}
              >
                Next
              </button>
            </>
          );
        })()}
      </div>

      
      {isOpen && <AddWordModal close={() => { setIsOpen(false); getWords(); }} getWords={null} />}
    </div>
  );
};

export default Dictionary;