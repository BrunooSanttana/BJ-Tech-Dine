import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg'; 

const Home = () => (
  <div>
    <h1> BJ Tech Dine</h1>
    <img src={logo} alt="Logo" />
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Cadastre-se</Link>
    </nav>
  </div>
);

export default Home;
