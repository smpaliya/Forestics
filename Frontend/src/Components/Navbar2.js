import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, FileText, Newspaper, User } from 'lucide-react';

export default function Navbar2(){
    return(
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
        </ul>
      </div>
    </nav>
        
        </>
    )
}