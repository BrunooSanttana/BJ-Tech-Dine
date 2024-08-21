import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Sales from './pages/Sales'; // página de Vendas
import CloseTable from './pages/CloseTable'; // página de Fechamento de Mesa
import Clients from './pages/Clients'; //  página de Clientes
import Home from './pages/Home'; //  Home.js
import Menu from './pages/Menu';



function App() {
  return (
    <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/close-table" element={<CloseTable />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main>
    </Router>
  );
}

export default App;
