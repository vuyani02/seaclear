import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => (
  <div className="sidebar">
    <h2>Menu</h2>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/beaches">Beaches</Link></li>
    </ul>
  </div>
);

export default Sidebar;
