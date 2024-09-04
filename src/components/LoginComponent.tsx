import React from 'react';
import HeaderComponent from './HeaderComponent';
import './LoginComponent.css'; // Import the CSS file

const LoginComponent: React.FC = () => {
  return (
    <div className="login-page">
      <HeaderComponent />
      <h2 className="login-heading">Login</h2>
      <form className="login-form">
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
