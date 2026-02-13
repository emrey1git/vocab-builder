import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateWord } from "../api/wordService.js";
import ukFlag from "/united kingdom.png";
import uaFlag from "/ukraine (1).png";
import "./css/EditWordModal.css";

const EditWordModal = ({ word, close, onSuccess }) => {
  const [formData, setFormData] = useState({
    en: "",
    ua: "",
  });

  useEffect(() => {
    if (word) {
      setFormData({
        en: word.en || "",
        ua: word.ua || "",
      });
    }
  }, [word]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWord(word._id, { ...word, ...formData });
      toast.success("Word updated successfully! 🎉");
      close();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to update word.");
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="edit-modal-content">
        <button className="edit-modal-close" onClick={close}>&times;</button>
        
        <form className="edit-modal-form" onSubmit={handleSubmit}>
     
          <div className="edit-input-group">
            <div className="edit-input-wrapper">
              <input
                type="text"
                value={formData.ua}
                onChange={(e) => setFormData({ ...formData, ua: e.target.value })}
                placeholder="Ukrainian translation"
              />
              <div className="edit-lang-info">
                <img src={uaFlag} alt="UA" className="edit-flag" />
                <span>Ukrainian</span>
              </div>
            </div>
          </div>

 
          <div className="edit-input-group">
            <div className="edit-input-wrapper">
              <input
                type="text"
                value={formData.en}
                onChange={(e) => setFormData({ ...formData, en: e.target.value })}
                placeholder="English word"
              />
              <div className="edit-lang-info">
                <img src={ukFlag} alt="UK" className="edit-flag" />
                <span>English</span>
              </div>
            </div>
          </div>

          
          <div className="edit-modal-actions">
            <button type="submit" className="edit-save-btn">Save</button>
            <button type="button" className="edit-cancel-btn" onClick={close}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWordModal;