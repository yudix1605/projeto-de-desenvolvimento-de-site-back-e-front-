// frontend/app/alimentos/page.tsx

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
    <main className="min-h-screen px-4 py-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="text-orange-500">🍊</span>
              Meus Alimentos
            </h1>
            <p className="text-gray-400">Gerencie sua base de alimentos</p>
          </div>
          <a
            href="/"
            className="px-4 py-2 bg-[#1a1a1a] text-gray-400 rounded-lg border border-gray-700 hover:border-orange-500 hover:text-orange-500 transition text-sm"
          >
            ← Voltar
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <input
            type="text"
            placeholder="🔍 Buscar alimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <a
            href="/alimentos/novo"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-500/25 text-center"
          >
            ➕ Novo Alimento
          </a>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="text-gray-400 mt-4">Carregando...</p>
        </div>
      ) : alimentosFiltrados.length === 0 ? (
        <div className="text-center py-12 card">
          <span className="text-6xl mb-4 block">🍽️</span>
          <p className="text-gray-400 text-lg">
            {searchTerm ? 'Nenhum alimento encontrado' : 'Nenhum alimento cadastrado ainda'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {alimentosFiltrados.map((a) => (
            <div
              key={a.id}
              className="card group hover:shadow-lg hover:shadow-orange-500/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-orange-400 mb-3 group-hover:text-orange-300 transition">
                    {a.nome}
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-800">
                      <div className="text-xs text-gray-500 mb-1">Calorias</div>
                      <div className="text-lg font-bold text-orange-400">{a.calorias}</div>
                      <div className="text-xs text-gray-600">kcal</div>
                    </div>
                    
                    <div className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-800">
                      <div className="text-xs text-gray-500 mb-1">Proteínas</div>
                      <div className="text-lg font-bold text-blue-400">{a.proteinas}</div>
                      <div className="text-xs text-gray-600">g</div>
                    </div>
                    
                    <div className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-800">
                      <div className="text-xs text-gray-500 mb-1">Carboidratos</div>
                      <div className="text-lg font-bold text-green-400">{a.carboidratos}</div>
                      <div className="text-xs text-gray-600">g</div>
                    </div>
                    
                    <div className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-800">
                      <div className="text-xs text-gray-500 mb-1">Gorduras</div>
                      <div className="text-lg font-bold text-yellow-400">{a.gorduras}</div>
                      <div className="text-xs text-gray-600">g</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <a
                    href={`/alimentos/editar/${a.id}`}
                    className="px-4 py-2 bg-[#1a1a1a] text-orange-400 rounded-lg border border-orange-500/30 hover:border-orange-500 hover:bg-[#222] transition text-sm font-medium text-center"
                  >
                    ✏️
                  </a>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="px-4 py-2 bg-[#1a1a1a] text-red-400 rounded-lg border border-red-500/30 hover:border-red-500 hover:bg-[#222] transition text-sm font-medium"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center text-gray-500 text-sm">
        Total: {alimentosFiltrados.length} alimento(s)
      </div>
    </main>
  );
}