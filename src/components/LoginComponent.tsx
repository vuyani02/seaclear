import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import './LoginComponent.css'; // Import the CSS file for styling

interface LoginComponentProps {
  setIsLoggedIn: (value: boolean) => void;
  setIsAdmin: (value: boolean) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ setIsLoggedIn, setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Example authentication logic
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      navigate('/admin'); // Redirect to admin interface
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <HeaderComponent />
      <div className="login-container">
        <h2>Login to SeaClear</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username:
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username" 
            />
          </label>
          <label>
            Password:
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
            />
          </label>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
