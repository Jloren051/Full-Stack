import React from "react";
import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    quantidade: "",
    imagem: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/products", {
        ...formData,
        preco: parseFloat(formData.preco),
        quantidade: parseInt(formData.quantidade)
      });
      navigate("/produtos");
    } catch (err) {
      const errorMsg = err.response?.data?.detalhes || err.response?.data?.erro || "Erro ao cadastrar produto.";
      alert("Erro: " + errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1>Novo Produto</h1>
        <div className="glass-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do Produto</label>
              <input 
                type="text" 
                required 
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Preço (R$)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  required 
                  onChange={(e) => setFormData({...formData, preco: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Quantidade em Estoque</label>
                <input 
                  type="number" 
                  required 
                  onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>URL da Imagem (Opcional)</label>
              <input 
                type="text" 
                placeholder="https://exemplo.com/imagem.jpg"
                onChange={(e) => setFormData({...formData, imagem: e.target.value})}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Salvando..." : "Cadastrar Produto"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/produtos")}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
