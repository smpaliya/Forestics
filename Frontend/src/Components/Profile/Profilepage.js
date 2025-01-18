import React, { useEffect, useState } from 'react';
import './Profilepage.css';
import {Link, Route, Routes,Navigate } from 'react-router-dom';
import axios from 'axios';
import { CiCirclePlus } from "react-icons/ci";
import AddPost from './AddPost';
import { FaHeart } from "react-icons/fa6";
function Profilepage() {
  const [userInfo, setUserInfo] = useState(null);  // Store user info
  const [posts, setPosts] = useState([]);          // Store posts
  const [loading, setLoading] = useState(true);    // Loading state for posts
  const [error, setError] = useState(null);        // Error state

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated by looking for the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');   // Get token from localStorage

    if (token) {
      // Fetch user info
      axios.get('http://localhost:8000/api/user-info/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      })
        .then(res => {
          setUserInfo(res.data);  // Store user info
          console.log(userInfo.profile);
        })
        .catch(err => {
          console.error('Error fetching user info:', err);
        });
    }
  }, []);  // Run once on component mount to fetch user info

  useEffect(() => {
    // Fetch posts only when userInfo is available
    if (userInfo) {
      const fetchUserPosts = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/user-posts/${userInfo.username}/`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setPosts(data);          // Set fetched posts
          setLoading(false);       // Stop loading
        } catch (error) {
          setError(error.error); // Set error message
          setLoading(false);
        }
      };
      fetchUserPosts();            // Trigger post fetching when userInfo is set
    }
  }, [userInfo]);  // Dependency on userInfo to fetch posts

  // Display loading state
  if (!userInfo) {
    return <div>Loading user info...</div>;  // Wait until userInfo is loaded
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error === "Error: 404") {
    return <div>No posts found for this user.</div>;
  }
  // Display error message
  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log('Rendering ProfilePage with userInfo:', userInfo);
  return (
    <>
    <div className='profilePage'>
      <div className="card">
        <div className="card-header">
          <img className="profile-picture" src={userInfo.profile.profile_picture_url} alt="User Profile" />
          <div className="user-info">
            <h2 className="username">{userInfo?.username}</h2>
          </div>
          <div className="stats">
          <div className="stat-item">
            <p className="stat-value">{userInfo?.post_count}</p>
            <p className="stat-label">Photographs</p>
          </div>
        </div>
        <Link to='/account/addPost'><CiCirclePlus className='addPost'></CiCirclePlus></Link>
        </div>
        
        
        <div className="photos-section">
        <h3 className="section-title">Posts</h3>
         
          <section id="photos">
            <div className='gallery'>
            
              {posts.map(post => (
                <div className='postitem' key={post.id}>
                  
                    <img className='userpost' src={post.photo} alt="Post" />
                    <div className='inAline'>
                    <p className='userdescription'>{post.comment}</p>
                    <p className='postlikes'> <FaHeart className='heartred'></FaHeart> {post.likes}</p>
                </div>
                </div>
              ))}
            
            </div>
          </section>
        
        </div>
      </div>
      </div>
    </>
  );
}

export default Profilepage;
