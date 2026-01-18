import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuSearch, LuPencil, LuTrash2, LuPlus, LuArrowRight } from "react-icons/lu";
import "./css/dictionary.css";

const Dictionary = () => {
  const [words, setWords] = useState([]);

  const getWords = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://vocab-builder-backend.p.goit.global/api/words/own",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    
    setWords([
      { _id: "1", en: "Apple", ua: "Яблуко", category: "Fruit", progress: 100 },
      { _id: "2", en: "Run", ua: "Бігти", category: "Verb", progress: 50 }
    ]);
  };

  const deleteWord = (id) => {
    console.log("Silinecek kelime ID:", id);
  };

  useEffect(() => {
    getWords();
  }, []);

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

          <button className="add-word-btn">
            Add word <LuPlus className="plus-icon" />
          </button>

          <Link to="/training" className="train-link">
            Train oneself <LuArrowRight className="arrow-icon" />
          </Link>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Word 🇬🇧</th>
            <th>Translation 🇺🇦</th>
            <th>Category</th>
            <th>Progress</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {words.map((word) => (
            <tr key={word._id}>
              <td>{word.en}</td>
              <td>{word.ua}</td>
              <td>{word.category}</td>
              <td>{word.progress}%</td>
              <td>
                <button onClick={() => console.log("Düzenle", word._id)}>
                  <LuPencil />
                </button>
                <button onClick={() => deleteWord(word._id)}>
                  <LuTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dictionary;