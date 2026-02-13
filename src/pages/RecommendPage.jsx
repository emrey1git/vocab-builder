import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { getRecommendedWords, addWordToDictionary } from "../api/wordService.js";
import Dashboard from "../components/Dashboard.jsx";
import WordsTable from "../components/WordsTable.jsx";
import WordsPagination from "../components/WordsPagination.jsx";
import { toast, ToastContainer } from "react-toastify";
import "./css/dictionary.css";

const RecommendPage = () => {
  const [words, setWords] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVerbType, setSelectedVerbType] = useState("regular");
  const [searchKeyword, setSearchKeyword] = useState("");


  const [refreshStats, setRefreshStats] = useState(false);

  const fetchWords = async () => {
    try {
      setIsLoading(true);
      const response = await getRecommendedWords({ 
        page: currentPage, 
        keyword: searchKeyword, 
        category: selectedCategory,
        isIrregular: selectedCategory === "verb" ? selectedVerbType === "irregular" : undefined
      });
      setWords(response.results || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      toast.error("Failed to fetch words.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, [currentPage, searchKeyword, selectedCategory, selectedVerbType]);

  const handleAddToDictionary = async (id) => {
    try {
      await addWordToDictionary(id);
      toast.success("Word added to your dictionary!");
      
      setRefreshStats(prev => !prev); 
      
      setWords((prev) => prev.filter((w) => w._id !== id));
    } catch (error) {
      toast.error("Could not add word.");
    }
  };

  return (
    <div className="dictionary-page">
      <Dashboard 
        isRecommend={true} 
       
        refreshTrigger={refreshStats} 
        selectedCategory={selectedCategory}
        onCategoryChange={(val) => {
          setSelectedCategory(val);
          setCurrentPage(1); 
        }}
        selectedVerbType={selectedVerbType}
        onVerbTypeChange={(val) => {
          setSelectedVerbType(val); 
          setCurrentPage(1);       
        }}
        onSearch={(val) => {
          setSearchKeyword(val);
          setCurrentPage(1);
        }}
      />

      <WordsTable
        words={words}
        isLoading={isLoading}
        renderActions={(word) => (
          <button
            type="button"
            className="add-to-dict-btn"
            onClick={() => handleAddToDictionary(word._id)}
          >
            Add to dictionary <LuPlus />
          </button>
        )}
      />

      <WordsPagination
        total={totalPages}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default RecommendPage;