import React from "react";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/sellers/login", {
        email,
        senha,
      });

      localStorage.clear(); // Limpa tudo antes de salvar o novo token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("seller", JSON.stringify(response.data.seller));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.erro || "Falha na autenticação. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '1rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--primary)' }}>GestStock</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>Acesse seu painel de gestão</p>
        
        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Corporativo</label>
            <input
              type="email"
              placeholder="seu@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? "Entrando..." : "Entrar no Dashboard"}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Ainda não tem uma conta? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}