import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/presleylogo.png';

const Menu = () => {
  return (

    <div>

      <img src={logo} alt="Logo" style={{ cursor: 'pointer', width: '100px', marginBottom: '20px' }} />

      <h2>Página Inicial</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <br></br>
          <li>
            <Link to="/sales">Vendas</Link>
          </li>
          <br></br>

          <li>
            <Link to="/faturamento">Faturamento</Link>
          </li>
          <br></br>

          <li>
            <Link to="/clients">Clientes</Link>
          </li>
          <br></br>

          <li>
            <Link to="/products">Cadastrar Produtos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
