import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuSearch, LuPencil, LuTrash2, LuPlus, LuArrowRight } from "react-icons/lu";
import wordServices, { deleteWordFromServer } from "../api/wordService.js";
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
  const perPage = 7; 

  const getWords = async () => {
    try {
      const data = await wordServices();
      const results = Array.isArray(data) ? data : (data?.results || []);
      setWords(results);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      getWords();
    }
  }, [isOpen]);

  const deleteWord = async (wordId) => {
    try {
      await deleteWordFromServer(wordId);
      toast.success("Word deleted!");
      getWords();
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  const totalPages = Math.max(1, Math.ceil(words.length / perPage));
  const currentWords = words.slice((currentPage - 1) * perPage, currentPage * perPage);

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
            <option value="noun">Noun</option>
            <option value="adjective">Adjective</option>
          </select>
        </div>

        <div className="filters-right">
          <div className="to-study">
            To study: <span className="study-count">
              {words.filter(w => w.progress < 100).length}
            </span>
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
        words={currentWords}
        renderActions={(word) => (
          <div className="action-buttons">
            <button onClick={() => { setEditingWord(word); setIsEditOpen(true); }}><LuPencil /></button>
            <button onClick={() => deleteWord(word._id)}><LuTrash2 /></button>
          </div>
        )}
      />

      <WordsPagination
        total={totalPages}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />

      {isOpen && <AddWordModal close={() => setIsOpen(false)} />}
      
      {isEditOpen && editingWord && (
        <EditWordModal 
          word={editingWord} 
          close={() => { setIsEditOpen(false); setEditingWord(null); }} 
          onSuccess={getWords} 
        />
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Dictionary;