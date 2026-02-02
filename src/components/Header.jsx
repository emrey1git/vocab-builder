import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
   
      <div className="logo-container">
       
        <span className="logo-icon">
          <img src="/src/assets/logo.png" alt="VocabBuilder Logo" /></span> 
        <Link to="/dictionary" className="brand-name">VocabBuilder</Link>
      </div>


      <nav className="header-navs">
        
        <Link to="/dictionary" className="nav-link active">
          Dictionary
        </Link>
        <Link to="/recommend" className="nav-link">
          Recommend
        </Link>
        <Link to="/training" className="nav-link">
          Training
        </Link>
      </nav>

     
      <div className="user-actions">
        <div className="user-info">
          <span className="user-name">Iryna</span>
      
       <div className="user-avatar">
  <img src="/src/assets/gridicons_user.png" alt="User Profile" /> 
</div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Log out &rarr;
        </button>
      </div>
    </header>
  );  
};

export default Header;