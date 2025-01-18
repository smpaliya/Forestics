// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsComponent from './NewsComponent'; // Updated import statement
import './NewsHandler.css';

const NewsHandler2 = () => {
  return (
  <>
      <div className="faded-background">
        <div className="container">
          <h1>NEWS</h1>
          <h2>Connecting with the forest</h2>
          <div className="curved-line"></div>
        </div>
        <NewsComponent />
      </div>
      <div className="container">
       
      </div>
  </>
  );
};

export default NewsHandler2;
