import React from 'react';
import './AuthComponent.css';

type AuthProps = {
  username: string;
  password: string;
  onLogin: () => void;
  onRegister: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRegistering: boolean;
  onToggleRegister: () => void;
};

const AuthComponent: React.FC<AuthProps> = ({
  username, password, onLogin, onRegister, onChange, isRegistering, onToggleRegister
}) => {
  return (
    <div className="auth-container">
      {isRegistering ? (
        <div className="auth-form">
          <h2>Create an Account</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={onChange}
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            className="input"
          />
          <button onClick={onRegister} className="auth-button">Register</button>
          <button onClick={onToggleRegister} className="auth-button">Back to Login</button>
        </div>
      ) : (
        <div className="auth-form">
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={onChange}
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            className="input"
          />
          <button onClick={onLogin} className="auth-button">Login</button>
          <button onClick={onToggleRegister} className="auth-button">Create an Account</button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
