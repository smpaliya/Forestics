import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import Dropdown from './Dropdown';
import './Information.css';


import leopardsImage from '../../Image/leopards.jpg';
import amazonImage from '../../Image/amazon.jpg';
import CanaryImage from '../../Image/canary.jpg';
import SundarbanTigerImage from '../../Image/Sundarban_Tiger.jpg';

function Information() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="information-page">
      <div className="header">
        <button className="back-button"></button>
        <h1 className="heading">ARTICLES</h1>
        <div className="dropdown-container">
          <button className="add-article-button" onClick={toggleDropdown}>
            <span className="plus-icon">+</span> ADD ARTICLE
          </button>
          {dropdownOpen && <Dropdown />}
        </div>
      </div>
      <div className="article-container">
        <ArticleCard
          title={
            <Link to="/article/1" className="article-link">
              The Elusive Leopard: Adaptations and Survival Strategies in Diverse Habitats
            </Link>
          }
          likes={130}
          backgroundColor="#78c08c"
          imageUrl={leopardsImage}
        />
        <ArticleCard
          title={
            <Link to="/article/2" className="article-link">
              The Amazon Basin's Unique Biodiversity: Species Found Nowhere Else on Earth
            </Link>
          }
          likes={153}
          backgroundColor="#e0ffc2"
          imageUrl={amazonImage}
        />
        <ArticleCard
          title={
            <Link to="/article/3" className="article-link">
              Forest Canaries: How Deforestation Threatens the Survival of Forest-Dwelling Birds
            </Link>
          }
          likes={146}
          backgroundColor="#c8ffdfc6"
          imageUrl={CanaryImage}
        />
        <ArticleCard
          title={
            <Link to="/article/4" className="article-link">
              Tigers of the Sundarbans: Protecting the Royal Bengal Tigers in a Unique Ecosystem
            </Link>
          }
          likes={121}
          backgroundColor="#439867c6"
          imageUrl={SundarbanTigerImage}
        />
      </div>
    </div>
  );
}

export default Information;
