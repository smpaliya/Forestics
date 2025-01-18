import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Users, FileText, Newspaper, User } from 'lucide-react';
import { FiMenu } from "react-icons/fi";
import './NavBar.css'

export default function NavBar({ setIsAuthenticated }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Set isAuthenticated to false
    setIsAuthenticated(false);

    // Redirect to the login page
    navigate('/login');
  };

  const toggleDropdown = () => {
    console.log("Menu icon clicked!");
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span>Forestics</span>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                <Home className="nav-icon" />
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/articles" className="nav-link">
                <FileText className="nav-icon" />
                <span className="nav-text">Articles</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/social" className="nav-link">
                <Users className="nav-icon" />
                <span className="nav-text">Social</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/news" className="nav-link">
                <Newspaper className="nav-icon" />
                <span className="nav-text">News</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/account" className="nav-link">
                <User className="nav-icon" />
                <span className="nav-text">Account</span>
              </Link>
            </li>
            <li className="nav-item">
              {/* Menu Icon */}
              <FiMenu onClick={toggleDropdown} className="nav-icon2" />
              {/* Dropdown */}
              {showDropdown && (
                <div className={`dropdown-content ${showDropdown ? 'active' : ''}`}>
                  <button className="dropitem" onClick={handleLogout}>LogOut</button>
                  <Link className="dropitem" to="/login">Login</Link>
                  <Link className="dropitem" to="/signin">Sign in</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
