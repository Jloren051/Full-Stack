import React from "react";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ActivateSeller() {
  const [celular, setCelular] = useState("");
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleActivate(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/sellers/activate", {
        celular,
        codigo,
      });
      alert("Conta ativada com sucesso! Agora você pode fazer login.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.erro || "Código inválido ou erro na ativação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '1rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Ativar Conta</h2>
        
        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Insira o número do celular e o código de 4 dígitos enviado via WhatsApp.
        </p>

        <form onSubmit={handleActivate}>
          <div className="form-group">
            <label>Celular (WhatsApp)</label>
            <input
              type="text"
              placeholder="+5511999999999"
              required
              onChange={(e) => setCelular(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Código de Ativação</label>
            <input
              type="text"
              placeholder="Ex: 1234"
              required
              maxLength={4}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? "Ativando..." : "Confirmar Ativação"}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
           Não recebeu? <button onClick={() => alert('Contate o suporte para reenvio.')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Solicitar novo código</button>
        </div>
      </div>
    </div>
  );
}
