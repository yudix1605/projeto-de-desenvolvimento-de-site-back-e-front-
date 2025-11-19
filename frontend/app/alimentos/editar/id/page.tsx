// frontend/app/alimentos/novo/page.tsx

'use client'

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function NovoAlimento() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    calorias: '',
    proteinas: '',
    carboidratos: '',
    gorduras: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/alimentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          calorias: parseFloat(formData.calorias),
          proteinas: parseFloat(formData.proteinas),
          carboidratos: parseFloat(formData.carboidratos),
          gorduras: parseFloat(formData.gorduras)
        })
      });

      if (res.ok) {
        router.push('/alimentos');
      } else {
        alert('Erro ao cadastrar alimento');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar alimento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="text-orange-500">➕</span>
              Novo Alimento
            </h1>
            <p className="text-gray-400">Adicione um novo alimento à sua base</p>
          </div>
          <a
            href="/alimentos"
            className="px-4 py-2 bg-[#1a1a1a] text-gray-400 rounded-lg border border-gray-700 hover:border-orange-500 hover:text-orange-500 transition text-sm"
          >
            ← Voltar
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome do Alimento *
            </label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Banana, Frango grelhado..."
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                🔥 Calorias (kcal) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.calorias}
                onChange={(e) => setFormData({ ...formData, calorias: e.target.value })}
                placeholder="0"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                💪 Proteínas (g) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.proteinas}
                onChange={(e) => setFormData({ ...formData, proteinas: e.target.value })}
                placeholder="0"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                🌾 Carboidratos (g) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.carboidratos}
                onChange={(e) => setFormData({ ...formData, carboidratos: e.target.value })}
                placeholder="0"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                🥑 Gorduras (g) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.gorduras}
                onChange={(e) => setFormData({ ...formData, gorduras: e.target.value })}
                placeholder="0"
                className="w-full"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Salvando...' : '✓ Salvar Alimento'}
              </button>
              
              <a
                href="/alimentos"
                className="px-8 py-4 bg-[#1a1a1a] text-gray-400 rounded-xl border border-gray-700 hover:border-orange-500 hover:text-orange-500 transition font-semibold text-center"
              >
                Cancelar
              </a>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-6 card bg-orange-500/5 border-orange-500/20">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-semibold text-orange-400 mb-1">Dica</h3>
            <p className="text-sm text-gray-400">
              Todos os valores nutricionais devem ser referentes a 100g do alimento para facilitar o cálculo das suas refeições.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}