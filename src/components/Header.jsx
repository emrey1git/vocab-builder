import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../api/wordService.js";
import { LuMenu, LuX } from "react-icons/lu"; 
import "./css/header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("User");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo();
        if (data && data.name) {
          setUserName(data.name);
          localStorage.setItem("name", data.name);
        }
      } catch (err) {
        console.log("User information could not be retrieved.", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsLogoutModalOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <header className="header">
      <div className="logo-container">
        <span className="logo-icon">
          <img src="/logo.png" alt="VocabBuilder Logo" />
        </span>
        <Link to="/dictionary" className="brand-name">
          VocabBuilder
        </Link>
      </div>

      <nav className={`header-navs ${isMenuOpen ? "mobile-open" : ""}`}>
        <Link 
          to="/dictionary" 
          className={`nav-link ${isActive("/dictionary")}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Dictionary
        </Link>
        <Link 
          to="/recommend" 
          className={`nav-link ${isActive("/recommend")}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Recommend
        </Link>
        <Link 
          to="/training" 
          className={`nav-link ${isActive("/training")}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Training
        </Link>
      </nav>

      <div className="user-actions">
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <div className="user-avatar">
            <img src="/gridicons_user.png" alt="User Profile" />
          </div>
        </div>
        <button className="logout-btn" onClick={() => setIsLogoutModalOpen(true)}>
          Log out &rarr;
        </button>

        <button className="burger-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <LuX /> : <LuMenu />}
        </button>
      </div>

      {isLogoutModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLogoutModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Log out</h2>
            <p className="modal-subtitle">Are you sure you want to log out?</p>
            <div className="modal-actions">
              <button className="btn-add" onClick={handleLogout}>
                Log out
              </button>
              <button className="btn-cancel" onClick={() => setIsLogoutModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;