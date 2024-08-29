import React, { useState, useEffect } from 'react';

const Clients = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState('');

  const handleClientSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, cpf, phone }),
      });

      if (response.ok) {
        const newClient = await response.json();
        setClients([...clients, newClient]);
        setName('');
        setCpf('');
        setPhone('');
        alert('Cliente cadastrado com sucesso!');
      } else {
        console.error('Erro ao cadastrar cliente');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor', error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2 className="centered-title">Cadastrar Cliente</h2>
      <form onSubmit={handleClientSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          CPF:
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Telefone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Cadastrar Cliente</button>
      </form>
    </div>
  );
};

export default Clients;
