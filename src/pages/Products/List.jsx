import React from "react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await api.get("/api/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Falha ao carregar produtos", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleInactivate(id) {
    if (!confirm("Deseja realmente inativar este produto?")) return;
    try {
      await api.patch(`/api/products/${id}/inactivate`);
      loadProducts();
    } catch (err) {
      alert("Erro ao inativar produto.");
    }
  }

  async function handleActivate(id) {
    if (!confirm("Deseja reativar este produto?")) return;
    try {
      await api.patch(`/api/products/${id}/activate`);
      loadProducts();
    } catch (err) {
      alert("Erro ao ativar produto.");
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Meus Produtos</h1>
        <Link to="/produtos/novo" className="btn btn-primary">
          + Adicionar Produto
        </Link>
      </div>

      <div className="glass-card" style={{ padding: '0' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ fontWeight: 500 }}>{product.nome}</td>
                    <td>R$ {product.preco.toFixed(2)}</td>
                    <td>{product.quantidade} un.</td>
                    <td>
                      <span className={`badge ${product.status === 'ativo' ? 'badge-success' : 'badge-danger'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link to={`/produtos/${product.id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                          Editar
                        </Link>
                        {product.status === 'ativo' ? (
                          <button onClick={() => handleInactivate(product.id)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', color: '#ef4444' }}>
                            Inativar
                          </button>
                        ) : (
                          <button onClick={() => handleActivate(product.id)} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                            Ativar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}