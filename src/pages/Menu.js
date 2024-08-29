import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <h2>Página Inicial</h2>
      <nav>
        <ul>
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sales">Vendas</Link>
          </li>
          <li>
            <Link to="/close-table">Fechar Mesa/Comanda</Link>
          </li>
          <li>
            <Link to="/clients">Clientes</Link>
          </li>
          <li>
            <Link to="/products">Cadastrar Produtos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
