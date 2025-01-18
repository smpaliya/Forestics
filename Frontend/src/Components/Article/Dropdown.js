import React from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css';

function Dropdown() {
  return (
    <div className="dropdown-menu">
      <Link to="/articles/new-article" className="dropdown-item">New Article</Link>
      <Link to="/articles/drafts" className="dropdown-item">Drafts</Link>
    </div>
  );
}

export default Dropdown;
