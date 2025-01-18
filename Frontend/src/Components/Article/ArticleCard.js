import React from 'react';
import './ArticleCard.css';

const ArticleCard = ({ title, backgroundColor, imageUrl }) => {
  const handleLikeClick = () => {
    console.log('Like button clicked');
  };

  return (
    <div className="article-card" style={{ backgroundColor }}>
      {imageUrl && (
        <img src={imageUrl} alt={title} className="article-image" />
      )}
      <div>{title}</div>
      <div className="like-container">
      </div>
    </div>
  );
};

export default ArticleCard;
