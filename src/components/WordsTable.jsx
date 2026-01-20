import React from "react";
import "./css/WordsTable.css"; 

const WordsTable = ({ words, renderActions }) => {
  return (
    <table className="words-table">
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
        {words.length > 0 ? (
          words.map((word) => (
            <tr key={word._id}>
              <td>{word.en}</td>
              <td>{word.ua}</td>
              <td>{word.category}</td>
              <td>{word.progress}%</td>
              <td>
                {renderActions && renderActions(word)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
              No words found yet...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default WordsTable;