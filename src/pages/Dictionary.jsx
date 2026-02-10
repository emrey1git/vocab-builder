import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LuSearch,
  LuPencil,
  LuTrash2,
  LuPlus,
  LuArrowRight,
} from "react-icons/lu";
import wordServices, { deleteWordFromServer, getStatistics } from "../api/wordService.js";
import WordsTable from "../components/WordsTable.jsx";
import WordsPagination from "../components/WordsPagination.jsx";
import AddWordModal from "../components/AddWordModal.jsx";
import EditWordModal from "../components/EditWordModal.jsx";
import { toast, ToastContainer } from "react-toastify";
import "./css/dictionary.css";

const Dictionary = () => {
  const location = useLocation();
  const [words, setWords] = useState([]);
  const [isOpen, setIsOpen] = useState(location.state?.openModal || false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingWord, setEditingWord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalToStudy, setTotalToStudy] = useState(0);

  // Silme Onay Modalı State'leri
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [wordToDeleteId, setWordToDeleteId] = useState(null);

  const timerRef = useRef(null);

  const getWords = useCallback(async () => {
    try {
      const data = await wordServices({
        page: currentPage,
        keyword: searchKeyword,
        category: selectedCategory,
      });
      setWords(data.results || []);
      setTotalPages(data.totalPages || 1);

      const stats = await getStatistics();
      setTotalToStudy(stats.totalCount || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentPage, searchKeyword, selectedCategory]);

  useEffect(() => {
    getWords();
  }, [getWords]);

  useEffect(() => {
    if (!isOpen) {
      getWords();
    }
  }, [isOpen, getWords]);

  const deleteWord = async (wordId) => {
    try {
      await deleteWordFromServer(wordId);
      toast.success("Word deleted! 🔥");
      getWords();
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setSearchKeyword(value);
      setCurrentPage(1);
    }, 300);
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
              onChange={handleSearchChange}
            />
            <LuSearch className="search-icon" />
          </div>

          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
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

        <div className="filters-right">
          <div className="to-study">
            To study: <span className="study-count">{totalToStudy}</span>
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
        words={words}
        renderActions={(word) => (
          <div className="action-buttons">
            <button
              onClick={() => {
                setEditingWord(word);
                setIsEditOpen(true);
              }}
            >
              <LuPencil />
            </button>
            <button
              onClick={() => {
                setWordToDeleteId(word._id);
                setIsDeleteOpen(true);
              }}
            >
              <LuTrash2 />
            </button>
          </div>
        )}
      />

      <WordsPagination
        total={totalPages}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />

      {/* MODAL BÖLÜMÜ */}
      
      {isOpen && (
        <AddWordModal close={() => setIsOpen(false)} getWords={getWords} />
      )}

      {isEditOpen && editingWord && (
        <EditWordModal
          word={editingWord}
          close={() => {
            setIsEditOpen(false);
            setEditingWord(null);
          }}
          onSuccess={getWords}
        />
      )}

      {/* SİLME ONAY MODALI */}
      {isDeleteOpen && (
        <div className="modal-overlay" onClick={() => setIsDeleteOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Delete word</h2>
            <p className="modal-subtitle">
              Are you sure you want to delete this word? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="btn-add"
                style={{ backgroundColor: "#D42C2C", color: "white" }}
                onClick={() => {
                  deleteWord(wordToDeleteId);
                  setIsDeleteOpen(false);
                }}
              >
                Delete
              </button>
              <button className="btn-cancel" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Dictionary;