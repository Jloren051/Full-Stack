import React from "react";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterSeller() {
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    celular: "",
    senha: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/sellers", formData);
      alert("Cadastro realizado! Verifique seu código de ativação no WhatsApp.");
      navigate("/activate");
    } catch (err) {
      const errorMsg = err.response?.data?.detalhes || err.response?.data?.erro || "Erro ao realizar cadastro.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '1rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Cadastro de Mini Mercado</h2>
        
        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Nome do Estabelecimento</label>
            <input
              type="text"
              placeholder="Ex: Mercadinho do Bairro"
              required
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>CNPJ</label>
            <input
              type="text"
              placeholder="00.000.000/0001-00"
              required
              onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>E-mail Corporativo</label>
            <input
              type="email"
              placeholder="contato@mercado.com"
              required
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Celular (WhatsApp)</label>
            <input
              type="text"
              placeholder="+5511999999999"
              required
              onChange={(e) => setFormData({...formData, celular: e.target.value})}
            />
            <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Use o formato internacional: +55...</small>
          </div>

          <div className="form-group">
            <label>Senha de Acesso</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              onChange={(e) => setFormData({...formData, senha: e.target.value})}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? "Processando..." : "Criar Minha Conta"}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
          Já possui cadastro? <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Fazer Login</Link>
        </div>
      </div>
    </div>
  );
}
