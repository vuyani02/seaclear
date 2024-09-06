import React from 'react';

type LoginProps = {
  username: string;
  password: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => void;
  onRegisterToggle: () => void;
};

const Login: React.FC<LoginProps> = ({ username, password, onChange, onLogin, onRegisterToggle }) => (
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
    <button onClick={onRegisterToggle} className="auth-button">Create an Account</button>
  </div>
);

export default Login;
