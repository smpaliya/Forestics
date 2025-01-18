import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArticleDetails.css';

const ArticleDetails2 = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      console.log('token', token);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/articles/${id}`, {
          headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        setArticle(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching article:', err);
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

export default ArticleDetails2;
