import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Menu({ children }) {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/bar">Bar</Link>
        {' '}
        <Link to="/home">Home</Link>
      </header>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  );
}