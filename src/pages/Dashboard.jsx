import React from "react";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ total_estoque: 0, valor_total_vendido: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await api.get("/api/dashboard");
        setStats(response.data);
      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Carregando painel...</div>;

  return (
    <div className="container">
      <header style={{ marginBottom: '3rem' }}>
        <h1>Painel de Controle</h1>
        <p style={{ color: 'var(--text-muted)' }}>Visão geral do seu estoque e performance de vendas.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Itens em Estoque
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)' }}>
            {stats.total_estoque}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>
            ↑ Atualizado em tempo real
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Receita Total
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>
            R$ {stats.valor_total_vendido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>
            ✓ Vendas processadas
          </div>
        </div>
      </div>

      <section style={{ marginTop: '4rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Ações Rápidas</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => window.location.href='/produtos/novo'}>
            + Novo Produto
          </button>
          <button className="btn btn-secondary" onClick={() => window.location.href='/vendas/nova'}>
            Registrar Venda
          </button>
        </div>
      </section>

      <section style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'rgba(21, 101, 192, 0.05)', borderRadius: '16px', border: '1px dashed var(--primary)' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Chave de Autenticação (Token JWT)</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Esta é a sua chave de acesso exigida para requisições manuais ao projeto.
        </p>
        
        <div style={{ position: 'relative' }}>
          <textarea 
            readOnly 
            value={localStorage.getItem("token") || "Token não encontrado. Faça login novamente."}
            style={{ 
              width: '100%', 
              height: '80px', 
              padding: '1rem', 
              borderRadius: '8px', 
              border: '1px solid #ddd', 
              fontSize: '0.75rem', 
              fontFamily: 'monospace',
              backgroundColor: '#fff',
              color: '#666',
              resize: 'none'
            }}
          />
          <button 
            onClick={() => {
              navigator.clipboard.writeText(localStorage.getItem("token"));
              alert("Token copiado para a área de transferência!");
            }}
            style={{
              position: 'absolute',
              right: '10px',
              top: '10px',
              padding: '4px 8px',
              fontSize: '0.7rem',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Copiar
          </button>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <strong>Atenção:</strong> Nunca compartilhe este token com terceiros. Ele dá acesso total à sua conta.
        </p>
      </section>
    </div>
  );
}
