import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importando Link
import logo from '../images/presleylogo.png';


const Faturamento = () => {
  const [startDate, setStartDate] = useState(''); // Data de início
  const [endDate, setEndDate] = useState(''); // Data de fim
  const [totalAmount, setTotalAmount] = useState(0); // Total das vendas

  // Função para buscar o faturamento com base no período selecionado
  const fetchFaturamento = async () => {
    if (!startDate || !endDate) {
      alert('Por favor, selecione o período.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/faturamento?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Erro na rede: ' + response.statusText);
      }
      const data = await response.json();

      // Defina apenas o total retornado
      setTotalAmount(data.total);

      console.log('Faturamento encontrado:', data); // Para depuração
    } catch (error) {
      console.error('Erro ao buscar faturamento:', error);
    }
  };

  return (
    <div>
      {/* Logo como link para o Menu */}
      <Link to="/Menu">
        <img src={logo} alt="Logo"  style={{ cursor: 'pointer', width: '100px', marginBottom: '20px' }} />
      </Link>

      <h2>Faturamento</h2>

      <div>
        <label>
          Data de Início:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Data de Fim:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      <button onClick={fetchFaturamento}>Buscar Faturamento</button>

      <h3>Total Faturado no Período: R${totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default Faturamento;
