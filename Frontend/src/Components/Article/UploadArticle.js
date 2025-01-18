
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadArticle.css';

function UploadArticle() {
const [username, setUsername] = useState(null);  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    console.log("Taking username from local storage")
    // Retrieve the username from localStorage or fetch from API
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(String(storedUsername));  // Ensure username is a string
    } else {
      console.error('No username found in localStorage');
    }
  }, []);
  console.log("username",username);
  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    
    // Correctly initialize FormData
    const articleData = new FormData();
    //articleData.append('username', username);
    articleData.append('articleImage', image);
    articleData.append('title', title);
    articleData.append('article', content);
    articleData.append('date', '2024-10-21');
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/articles/', {
        method: 'POST',
        body: articleData,  // Correct body to send the form data
        headers: {
            'Authorization': `Token ${token}` ,  // Include the token in the headers
        },
      });
      for (const [key, value] of articleData.entries()) {
        console.log(key, value);
      }
      console.log('Token:', token);  
   
      if (response.ok) {
        alert('Article posted successfully!');
      } else {
        alert('Failed to post article');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (
    <div className="upload-article">
      <div className="upload-area">
        <h2>Upload Image/File</h2>
        <label className='uploadlabel' htmlFor="file-upload">Click to Upload</label>
        <input id="file-upload" type="file" onChange={handleImageUpload} />
        {image && <img src={image} alt="Uploaded Preview" className="uploaded-image" />}
      </div>
      <div className="details-area">
        <h1 className='articleuploadh1'>Upload Article</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className='titleinputarticle'
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button onClick={handleArticleSubmit}>Upload Article</button>
       
      </div>
    </div>
  );
}

export default UploadArticle;
