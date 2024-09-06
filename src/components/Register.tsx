import React from 'react';

type RegisterProps = {
  username: string;
  password: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRegister: () => void;
  onLoginToggle: () => void;
};

const Register: React.FC<RegisterProps> = ({ username, password, onChange, onRegister, onLoginToggle }) => (
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
    <button onClick={onLoginToggle} className="auth-button">Back to Login</button>
  </div>
);

export default Register;
