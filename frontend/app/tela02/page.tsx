// frontend/app/tela02/page.tsx

'use client'

import { useState, useEffect, FormEvent } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        router.push('/tela01');
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
    <main style={{minHeight: '100vh', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto'}}>
      <div style={{marginBottom: '2rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem'}}>
          <div>
            <h1 style={{fontSize: 'clamp(1.875rem, 4vw, 2.25rem)', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff'}}>
              <span style={{color: '#ff8c42'}}>➕</span>
              Novo Alimento
            </h1>
            <p style={{color: '#9ca3af', fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>
              Adicione um novo alimento à sua base
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{background: '#151515', border: '1px solid #2a2a2a', borderRadius: '1rem', padding: '1.75rem'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db', marginBottom: '0.5rem'}}>
              Nome do Alimento *
            </label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Banana, Frango grelhado..."
              style={{width: '100%', background: '#1a1a1a', border: '2px solid #2a2a2a', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#fff', fontSize: '1rem'}}
            />
          </div>

          <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1.5rem'}}>
            <div>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db', marginBottom: '0.5rem'}}>
                🔥 Calorias (kcal) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.calorias}
                onChange={(e) => setFormData({ ...formData, calorias: e.target.value })}
                placeholder="0"
                style={{width: '100%', background: '#1a1a1a', border: '2px solid #2a2a2a', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#fff', fontSize: '1rem'}}
              />
            </div>

            <div>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db', marginBottom: '0.5rem'}}>
                💪 Proteínas (g) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.proteinas}
                onChange={(e) => setFormData({ ...formData, proteinas: e.target.value })}
                placeholder="0"
                style={{width: '100%', background: '#1a1a1a', border: '2px solid #2a2a2a', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#fff', fontSize: '1rem'}}
              />
            </div>

            <div>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db', marginBottom: '0.5rem'}}>
                🌾 Carboidratos (g) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.carboidratos}
                onChange={(e) => setFormData({ ...formData, carboidratos: e.target.value })}
                placeholder="0"
                style={{width: '100%', background: '#1a1a1a', border: '2px solid #2a2a2a', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#fff', fontSize: '1rem'}}
              />
            </div>

            <div>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db', marginBottom: '0.5rem'}}>
                🥑 Gorduras (g) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.gorduras}
                onChange={(e) => setFormData({ ...formData, gorduras: e.target.value })}
                placeholder="0"
                style={{width: '100%', background: '#1a1a1a', border: '2px solid #2a2a2a', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#fff', fontSize: '1rem'}}
              />
            </div>
          </div>

          <div style={{paddingTop: '1rem', borderTop: '1px solid #2a2a2a'}}>
            <div style={{display: 'flex', gap: '1rem', flexDirection: isMobile ? 'column' : 'row'}}>
              <button
                type="submit"
                disabled={loading}
                style={{flex: 1, padding: '1rem', background: loading ? '#666' : 'linear-gradient(to right, #ff8c42, #ff6b35)', color: 'white', borderRadius: '0.75rem', fontWeight: '600', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem', boxShadow: '0 10px 25px rgba(255, 140, 66, 0.25)', opacity: loading ? 0.5 : 1}}
              >
                {loading ? 'Salvando...' : '✓ Salvar Alimento'}
              </button>
              
              <a
                href="/tela01"
                style={{padding: '1rem 2rem', background: '#1a1a1a', color: '#9ca3af', borderRadius: '0.75rem', border: '1px solid #2a2a2a', fontWeight: '600', textAlign: 'center', textDecoration: 'none', fontSize: '1rem'}}
              >
                Cancelar
              </a>
            </div>
          </div>
        </div>
      </form>

      <div style={{marginTop: '1.5rem', background: 'rgba(255, 140, 66, 0.05)', border: '1px solid rgba(255, 140, 66, 0.2)', borderRadius: '1rem', padding: '1rem'}}>
        <div style={{display: 'flex', gap: '0.75rem'}}>
          <span style={{fontSize: '1.5rem'}}>💡</span>
          <div>
            <h3 style={{fontWeight: '600', color: '#ff8c42', marginBottom: '0.25rem', fontSize: '0.875rem'}}>Dica</h3>
            <p style={{fontSize: '0.875rem', color: '#9ca3af', margin: 0}}>
              Todos os valores nutricionais devem ser referentes a 100g do alimento para facilitar o cálculo das suas refeições.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}