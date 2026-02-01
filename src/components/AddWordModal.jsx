import React, { useState } from "react";
import { toast } from "react-toastify";
import {createNewWord} from "../api/wordService.js"
import "./css/AddWordModal.css";

const AddWordModal = ({ close , getWords}) => {
  const [formData, setFormData] = useState({
    en: "",
    ua: "",
    category: "verb",
    isRegular: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.en.trim() === "") {
      toast.error("Please enter the English word.");
      return;
    }
    if (formData.ua.trim() === "") {
      toast.error("Please enter the Ukrainian word.");
      return;
    }
    try {
      const created = await createNewWord(formData);
      window.dispatchEvent(new CustomEvent("wordsUpdated", { detail: created }));
      toast.success("Word added successfully! 🎉");
      close();
      if (typeof getWords === "function") await getWords();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add word. ❌");
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value === "regular" : value,
    }));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={close}>
          &times;
        </button>

        <h2 className="modal-title">Add word</h2>
        <p className="modal-subtitle">
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <select
              name="category"
              className="modal-select"
              value={formData.category}
              onChange={handleChange}
            >
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

          {formData.category === "verb" && (
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="isRegular"
                  value="regular"
                  checked={formData.isRegular}
                  onChange={handleChange}
                />{" "}
                Regular
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="isRegular"
                  value="irregular"
                  checked={!formData.isRegular}
                  onChange={handleChange}
                />{" "}
                Irregular
              </label>
            </div>
          )}

          {/* Yan yana duran inputlar */}
          <div className="fields-row">
            <div className="input-wrapper">
              <label>Ukrainian</label>
              <input
                type="text"
                name="ua"
                placeholder="Введіть переклад"
                value={formData.ua}
                onChange={handleChange}
              />
            </div>
            <div className="input-wrapper">
              <label>English</label>
              <input
                type="text"
                name="en"
                placeholder="Enter word"
                value={formData.en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-add">
              Add
            </button>
            <button type="button" className="btn-cancel" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWordModal;
