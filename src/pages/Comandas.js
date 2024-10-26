import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Comandas = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Recupera os pedidos do Local Storage
  useEffect(() => {
    const savedOrders = localStorage.getItem('salesOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleOrderClick = (tableNumber) => {
    console.log(`Navegando para /sales/${tableNumber}`); // Verifique se a navegação está correta
    navigate(`/sales/${tableNumber}`);
  };

  return (
    <div>
      <h2>Comandas em Aberto</h2>
      {orders.length === 0 ? (
        <p>Nenhuma comanda em aberto.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} onClick={() => handleOrderClick(order.tableNumber)} style={{ cursor: 'pointer', color: 'blue' }}>
             {order.tableNumber}
            </li>
          ))}
        </ul>
      )}

      <Link to="/sales">Iniciar Nova Venda</Link>
    </div>
  );
};

export default Comandas;
