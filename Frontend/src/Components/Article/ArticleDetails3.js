import React from 'react';
import { useLocation } from 'react-router-dom';
import './ArticleDetails.css';
const ArticleDetails3 = () => {
  const location = useLocation();
  const article = location.state.article; // Access the passed article data

  return (
    <div>
         <div className="article-details">
      <img src={article.articleImage} alt={article.title} className="image" />
      <h1 className="title">{article.title}</h1>
      <div className="author-date">
        <div className="author-info">
          <div className="author-name">{article.username}</div>
        </div>
        <div className="date">{article.date}</div>
      </div>
      <p className="content">{article.article}</p>
    </div>
    </div>
  );
};

export default ArticleDetails3;
