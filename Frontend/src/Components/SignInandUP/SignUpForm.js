import React, { useState } from 'react';

import axios from 'axios';
import '../SignInandUP/SignUp.css'
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    // Clear previous error messages
    setError('');
    setSuccessMessage('');
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    
    if (profilePicture) {
      formData.append('profile_picture', profilePicture); // Include profile picture in form data
    }

    axios.post('http://localhost:8000/api/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        setSuccessMessage('User registered successfully!');
        navigate("/login");
      })
      .catch(error => {
        setError(error.response.data.error || 'An error occurred during registration.');
      });
  };

  return (
    <div className='SignUp' >
      <h1 className='signuptitle'>Signup</h1>
    <form onSubmit={handleSubmit} className="signup-form">
    <label 
      className='ProfilePicture'>
        Profile-Picture
      </label>
      <br></br>
      <input
        type='file'
        placeholder="Add picture"
        className='profilepictureinput'
        onChange={e => setProfilePicture(e.target.files[0])}
      />
      <br></br>
      <label 
      className='Username'>
        Username
      </label>
      <br></br>
      <input
        type="text"
        placeholder="Username"
        className='usernameinput'
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <br></br>
      <label 
      className='Email'>
        Email
      </label>
      <br></br>
      <input
        type="email"
        placeholder="Email"
        className='emailInput'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <br></br>
      <label 
      className='Password'>
        Password
      </label>
      <br></br>
      <input
        type="password"
        placeholder="Password"
        className='passwordInput'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <br></br>
      <button type="submit">Sign Up</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
    </div>
  );
};

export default SignUpForm;
