// frontend/app/tela01/page.tsx (ou alimentos/page.tsx)

'use client'

import { useEffect, useState } from "react";

type Food = {
  id: number;
  nome: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
};

export default function ListaAlimentos() {
  const [alimentos, setAlimentos] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/alimentos')
      .then(res => res.json())
      .then(data => {
        setAlimentos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const alimentosFiltrados = alimentos.filter(a =>
    a.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente excluir este alimento?')) return;
    
    try {
      const res = await fetch(`http://localhost:5000/alimentos/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        setAlimentos(alimentos.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir alimento');
    }
  };

  return (
    <main style={{minHeight: '100vh', padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto'}}>
      <div style={{marginBottom: '2rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem'}}>
          <div>
            <h1 style={{fontSize: 'clamp(1.875rem, 4vw, 2.25rem)', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', flexWrap: 'wrap'}}>
              <img 
                src="/image.svg" 
                alt="Dietic Logo" 
                style={{width: '48px', height: '48px', objectFit: 'contain', filter: 'drop-shadow(0 10px 40px rgba(255, 107, 53, 0.3))'}}
              />
              Meus Alimentos
            </h1>
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: window.innerWidth < 640 ? 'column' : 'row', gap: '1rem', alignItems: 'stretch'}}>
          <input
            type="text"
            placeholder="🔍 Buscar alimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{flex: 1, background: '#1a1a1a', border: '2px solid #2a2a2a', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#fff', fontSize: '1rem'}}
          />
          <a
            href="/tela02"
            style={{padding: '0.875rem 1.5rem', background: 'linear-gradient(to right, #ff8c42, #ff6b35)', color: 'white', borderRadius: '0.75rem', fontWeight: '600', textDecoration: 'none', textAlign: 'center', boxShadow: '0 10px 25px rgba(255, 140, 66, 0.25)', whiteSpace: 'nowrap'}}
          >
            ➕ Novo Alimento
          </a>
        </div>
      </div>

      {loading ? (
        <div style={{textAlign: 'center', padding: '3rem 0'}}>
          <div style={{display: 'inline-block', width: '48px', height: '48px', border: '4px solid #ff8c42', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
          <p style={{color: '#9ca3af', marginTop: '1rem'}}>Carregando...</p>
        </div>
      ) : alimentosFiltrados.length === 0 ? (
        <div style={{textAlign: 'center', padding: '3rem 0', background: '#151515', border: '1px solid #2a2a2a', borderRadius: '1rem'}}>
          <span style={{fontSize: '4rem', display: 'block', marginBottom: '1rem'}}>🍽️</span>
          <p style={{color: '#9ca3af', fontSize: '1.125rem'}}>
            {searchTerm ? 'Nenhum alimento encontrado' : 'Nenhum alimento cadastrado ainda'}
          </p>
        </div>
      ) : (
        <div style={{display: 'grid', gap: '1rem'}}>
          {alimentosFiltrados.map((a) => (
            <div
              key={a.id}
              style={{background: '#151515', border: '1px solid #2a2a2a', borderRadius: '1rem', padding: '1.5rem', transition: 'all 0.3s'}}
            >
              <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap'}}>
                <div style={{flex: 1, minWidth: '250px'}}>
                  <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#ff8c42', marginBottom: '1rem'}}>
                    {a.nome}
                  </h3>
                  
                  <div style={{display: 'grid', gridTemplateColumns: window.innerWidth < 640 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '1rem'}}>
                    <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '0.875rem', border: '1px solid #2a2a2a'}}>
                      <div style={{fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem'}}>Calorias</div>
                      <div style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#ff8c42'}}>{a.calorias}</div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>kcal</div>
                    </div>
                    
                    <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '0.875rem', border: '1px solid #2a2a2a'}}>
                      <div style={{fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem'}}>Proteínas</div>
                      <div style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#60a5fa'}}>{a.proteinas}</div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>g</div>
                    </div>
                    
                    <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '0.875rem', border: '1px solid #2a2a2a'}}>
                      <div style={{fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem'}}>Carboidratos</div>
                      <div style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#34d399'}}>{a.carboidratos}</div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>g</div>
                    </div>
                    
                    <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '0.875rem', border: '1px solid #2a2a2a'}}>
                      <div style={{fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem'}}>Gorduras</div>
                      <div style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#fbbf24'}}>{a.gorduras}</div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>g</div>
                    </div>
                  </div>
                </div>
                
                <div style={{display: 'flex', flexDirection: window.innerWidth < 640 ? 'row' : 'column', gap: '0.5rem'}}>
                  <a
                    href={`/alimentos/editar/${a.id}`}
                    style={{padding: '0.625rem 1rem', background: '#1a1a1a', color: '#ff8c42', borderRadius: '0.5rem', border: '1px solid rgba(255, 140, 66, 0.3)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', textAlign: 'center', whiteSpace: 'nowrap'}}
                  >
                    ✏️ Editar
                  </a>
                  <button
                    onClick={() => handleDelete(a.id)}
                    style={{padding: '0.625rem 1rem', background: '#1a1a1a', color: '#ef4444', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.3)', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap'}}
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{marginTop: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem'}}>
        Total: {alimentosFiltrados.length} alimento(s)
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}