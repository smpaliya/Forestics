import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from './Components/SignInandUP/SignUpForm.js';
import SocialSite from './Components/Social/SocialSite.js';
import NavBar from './Components/NavBar.js';
import HomePage from './Components/Home/Homepage.js';
import Information from './Components/Article/Information.js';
import ArticleDetails from './Components/Article/ArticleDetails.js';
import NewArticle from './Components/Article/NewArticle.js';
import Drafts from './Components/Article/Drafts.js';
import AccountPage from './Components/Profile/AccountPage.js';
import AddPost from './Components/Profile/AddPost.js';
import LoginForm from './Components/LoginForm.js';
import UserDetail from './Components/UserDetail.js';
import Profilepage from './Components/Profile/Profilepage.js';
import UploadArticle from './Components/Article/UploadArticle.js';
import InformationNew from './Components/Article/InformationNew.js';
import ArticleDetails2 from './Components/Article/ArticleDetails2.js';
import ArticleDetails3 from './Components/Article/ArticleDetails3.js';
import NewsHandler2 from './Components/News/NewsHandler2.js';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated by looking for the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // PrivateRoute component to protect routes
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Redirect to home if user tries to access login page while authenticated */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
        path="/signin"
        element={<SignUpForm/>}/>
         <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        {/* Private routes */}
        <Route
          path="/home"
          element={<PrivateRoute><HomePage /></PrivateRoute>}
        />
        <Route
          path="/articles"
          element={<PrivateRoute><InformationNew /></PrivateRoute>}
        />
        <Route
          path="/articles/article/:id"
          element={<PrivateRoute><ArticleDetails3/></PrivateRoute>}
        />
        <Route
          path="/articles/new-article"
          element={<PrivateRoute><UploadArticle /></PrivateRoute>}
        />
        <Route
          path="/articles/drafts"
          element={<PrivateRoute><Drafts /></PrivateRoute>}
        />
        <Route
          path="/social"
          element={<PrivateRoute><SocialSite /></PrivateRoute>}
        />
        <Route
          path="/news"
          element={<PrivateRoute><NewsHandler2 /></PrivateRoute>}
        />

        <Route
          path="/account"
          element={<PrivateRoute><Profilepage/></PrivateRoute>}
        />
        
        <Route
          path="/account/addPost"
          element={<PrivateRoute><AddPost /></PrivateRoute>}
        />
        {/* Fallback for unknown routes */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
      
      {isAuthenticated && <NavBar setIsAuthenticated={setIsAuthenticated}/>} {/* Show NavBar only when authenticated */}
    </Router>
  );
}

export default App;
