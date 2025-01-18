import { useEffect, useState } from 'react';
import React from 'react';

import './NewsComponent.css'; // Import a CSS file for styling
import fallbackImage from '/Forsetics/forestics/src/Image/NewsFallback.jpg'
function NewsComponent() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsdata.io/api/1/news?apikey=pub_57004362891a69a030eb2d380d371b007e06b&q=wildlife&category=environment  ');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setNews(data.results); // Adjust this based on API response structure
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="news-container">
      <h1>Forest News</h1>
      <div className="news-list">
        {news.map((article, index) => (
          <div key={index} className="news-item">
            <div className='imgdiv'>
            <img 
                src={article.image_url ? article.image_url : fallbackImage} 
                alt={article.title || "Fallback Image"} 
                className="news-image" 
              />
            </div>
            <div className="news-info">
              <h2 className="news-title">
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h2>
              <p className="news-description">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsComponent;
