import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Sales from './pages/Sales'; // página de Vendas
import Faturamento from './pages/Faturamento'; // página com vendas totais
import Clients from './pages/Clients'; //  página de Clientes
import Home from './pages/Home'; //  Home.js
import Menu from './pages/Menu';
import Products from './pages/Products';


function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/faturamento" element={<Faturamento />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
