import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (!token) return null;

  return (
    <nav className="glass-card" style={{ 
      margin: '0', 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: '0',
      zIndex: 100,
      borderRadius: '0 0 12px 12px',
      borderTop: 'none'
    }}>
      <div style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--primary)', letterSpacing: '-0.025em' }}>
        Gest<span style={{ color: 'var(--secondary)' }}>Stock</span>
      </div>
      
      <div style={{ display: 'flex', gap: '2.5rem' }}>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/produtos" className="nav-link">Produtos</Link>
        <Link to="/vendas" className="nav-link">Vendas</Link>
        <Link to="/perfil" className="nav-link">Perfil</Link>
      </div>

      <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
        Sair do Sistema
      </button>
    </nav>
  );
}
