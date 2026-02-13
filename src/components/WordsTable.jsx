import React from "react";
import ukFlag from "../assets/united kingdom.png";
import uaFlag from "../assets/ukraine (1).png";
import "./css/WordsTable.css";

const WordsTable = ({ words, renderActions }) => {
  return (
    <div className="table-responsive-wrapper">
    <table className="words-table">
      <thead>
        <tr>
          <th>
            <span className="th-content">
              <span>Word</span>
              <img src={ukFlag} alt="UK Flag" className="flag-icon" />
            </span>
          </th>
          <th>
            <span className="th-content">
              <span>Translation</span>
              <img src={uaFlag} alt="Ukraine Flag" className="flag-icon" />
            </span>
          </th>
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
              <td>{renderActions && renderActions(word)}</td>
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
    </div>
  );
};

export default WordsTable;
