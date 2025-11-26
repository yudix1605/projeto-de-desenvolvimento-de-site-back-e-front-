// frontend/app/login/page.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva apenas as informações do usuário no localStorage (sem token)
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redireciona para a home
        router.push('/');
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem 1rem', background: '#0a0a0a', position: 'relative'}}>
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 140, 66, 0.1) 0%, transparent 50%)'
        }}
      />

      <div style={{width: '100%', maxWidth: '500px', position: 'relative', zIndex: 10}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <img 
            src="/image.svg" 
            alt="Dietic Logo" 
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1rem',
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 40px rgba(255, 107, 53, 0.3))'
            }}
          />
          <h1 style={{fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ffffff'}}>
            Entrar na sua conta
          </h1>
          <p style={{color: '#9ca3af', fontSize: '1rem'}}>
            Acesse sua conta para continuar
          </p>
        </div>

        <form onSubmit={handleLogin} style={{
          background: '#151515',
          border: '1px solid #2a2a2a',
          borderRadius: '1rem',
          padding: '2rem'
        }}>
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              color: '#ef4444',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <div style={{marginBottom: '1.5rem'}}>
            <label htmlFor="email" style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#d1d5db'}}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              style={{
                width: '100%',
                background: '#1a1a1a',
                border: '2px solid #2a2a2a',
                borderRadius: '0.75rem',
                padding: '0.875rem 1rem',
                color: '#e5e5e5',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label htmlFor="senha" style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#d1d5db'}}>
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                background: '#1a1a1a',
                border: '2px solid #2a2a2a',
                borderRadius: '0.75rem',
                padding: '0.875rem 1rem',
                color: '#e5e5e5',
                fontSize: '1rem'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              fontSize: '1rem',
              border: 'none',
              background: loading ? '#666' : 'linear-gradient(to right, #ff8c42, #ff6b35)',
              color: 'white',
              boxShadow: '0 10px 40px rgba(255, 140, 66, 0.25)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
            <p style={{color: '#9ca3af', fontSize: '0.875rem', margin: 0}}>
              Não tem uma conta?{' '}
              <a href="/registro" style={{color: '#ff8c42', fontWeight: '600', textDecoration: 'none'}}>
                Cadastre-se
              </a>
            </p>
          </div>
        </form>

        <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
          <a href="/" style={{color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none'}}>
            ← Voltar para home
          </a>
        </div>
      </div>
    </main>
  );
}