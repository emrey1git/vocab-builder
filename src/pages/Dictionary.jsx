import React from "react";
import { useEffect, useState } from "react";
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
    // setWords(data.results);
    setWords([
      { _id: "1", en: "Apple", ua: "Яблуко", category: "Fruit", progress: 100 },
      { _id: "2", en: "Run", ua: "Бігти", category: "Verb", progress: 50 }
    ]);
  };

  const deleteWord = (id) => {
    console.log("Silinecek kelime ID:", id);
    // İleride buraya API isteği ekleyeceğiz
  };

  useEffect(() => {
    console.log("Loading...");
    getWords();
  }, []);

  return (
    <div>
      <div className="dictionary-page">
        {/* Üstteki arama ve filtreleme kutuları buraya gelecek (şimdilik kalsın) */}

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
                    ✏️
                  </button>
                  <button onClick={() => deleteWord(word._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dictionary;
