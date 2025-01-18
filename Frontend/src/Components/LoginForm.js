import React,{useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './SignInandUP/SignUp.css'
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8000/api-token-auth/', { username, password })
        .then(res => {
         
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username',username);
          navigate('/');
        })
        .catch(error => {
          console.error("Authentication error: ", error);
        });
        
    };
  
    return (
      <form onSubmit={handleSubmit} className="signup-form">
        <label >username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
         <label >password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>New to Forestics?</p>
        <Link to='/signin'>Sign in</Link>
      </form>
    );
  };
  
  export default LoginForm;