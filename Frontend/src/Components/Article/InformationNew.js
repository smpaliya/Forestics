import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import Dropdown from './Dropdown';
import './Information.css';

function InformationNew() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [articles, setArticles] = useState([]); // State to store fetched articles
  const [loading, setLoading] = useState(true); // State to show loading while fetching data
  const [error, setError] = useState(null); // State to handle errors

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const fetchArticles = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
        console.log('token',token);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/articles/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`, // Include the token in the headers
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();
        setArticles(data); // Set articles data from the API
        setLoading(false); // Disable loading state after data is fetched
      } catch (error) {
        setError(error.message); // Set error if fetching fails
        setLoading(false); // Disable loading state if there's an error
      }
    };

    fetchArticles();
  }, []); 

  if (loading) {
    return <p>Loading articles...</p>; // Show loading message while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message if fetching fails
  }
  console.log("articles:",articles);

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
      <center>
      <div className="article-container">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={
              <Link to={`/articles/article/${article.id}`} state={{ article }}> {/* Pass the article data as state */}
              {article.title}</Link>
            }
            backgroundColor="#9ACD32"
            imageUrl={article.articleImage} // Assuming 'articleImage' field contains the URL to the article image
          />
        ))}
      </div>
      </center>
    </div>
  );
}

export default InformationNew;
