// frontend/app/registro/page.tsx
'use client'

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Registro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validação básica
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Registro bem-sucedido, redireciona para login
        router.push('/login');
      } else {
        setError(data.error || 'Erro ao criar conta');
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4" style={{background: '#0a0a0a'}}>
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 140, 66, 0.1) 0%, transparent 50%)'
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">🍊</span>
          <h1 className="text-4xl font-bold mb-2" style={{color: '#ffffff'}}>
            Criar conta
          </h1>
          <p style={{color: '#9ca3af'}}>
            Cadastre-se para começar
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: '#151515',
          border: '1px solid #2a2a2a',
          borderRadius: '16px',
          padding: '2rem'
        }}>
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              color: '#ef4444'
            }}>
              {error}
            </div>
          )}

          <div style={{marginBottom: '1.5rem'}}>
            <label className="block text-sm font-medium mb-2" style={{color: '#d1d5db'}}>
              Nome completo
            </label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Seu nome"
              style={{
                width: '100%',
                background: '#1a1a1a',
                border: '2px solid #2a2a2a',
                borderRadius: '12px',
                padding: '0.875rem',
                color: '#e5e5e5',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label className="block text-sm font-medium mb-2" style={{color: '#d1d5db'}}>
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="seu@email.com"
              style={{
                width: '100%',
                background: '#1a1a1a',
                border: '2px solid #2a2a2a',
                borderRadius: '12px',
                padding: '0.875rem',
                color: '#e5e5e5',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label className="block text-sm font-medium mb-2" style={{color: '#d1d5db'}}>
              Senha
            </label>
            <input
              type="password"
              required
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              placeholder="••••••••"
              style={{
                width: '100%',
                background: '#1a1a1a',
                border: '2px solid #2a2a2a',
                borderRadius: '12px',
                padding: '0.875rem',
                color: '#e5e5e5',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label className="block text-sm font-medium mb-2" style={{color: '#d1d5db'}}>
              Confirmar senha
            </label>
            <input
              type="password"
              required
              value={formData.confirmarSenha}
              onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
              placeholder="••••••••"
              style={{
                width: '100%',
                background: '#1a1a1a',
                border: '2px solid #2a2a2a',
                borderRadius: '12px',
                padding: '0.875rem',
                color: '#e5e5e5',
                fontSize: '1rem'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-semibold transition"
            style={{
              background: loading ? '#666' : 'linear-gradient(to right, #ff8c42, #ff6b35)',
              color: 'white',
              boxShadow: '0 10px 40px rgba(255, 140, 66, 0.25)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </button>

          <div className="text-center mt-6">
            <p style={{color: '#9ca3af'}}>
              Já tem uma conta?{' '}
              <a href="/login" style={{color: '#ff8c42', fontWeight: '600'}}>
                Fazer login
              </a>
            </p>
          </div>
        </form>

        <div className="text-center mt-6">
          <a href="/" style={{color: '#9ca3af', fontSize: '0.875rem'}}>
            ← Voltar para home
          </a>
        </div>
      </div>
    </main>
  );
}