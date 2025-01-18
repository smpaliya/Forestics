import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ArticleDetails.css';

const ArticleDetails = () => {
  const { id } = useParams();
  console.log('Article ID:', id);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
        console.log('token',token);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/articles/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
      });
        if (!response.ok) {
          console.error('Response Status:', response.status); 
          throw new Error('Failed to fetch articles');
        }
      
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
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
  );
};

export default ArticleDetails;
