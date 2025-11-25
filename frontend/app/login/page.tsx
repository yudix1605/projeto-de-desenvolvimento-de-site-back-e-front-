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
    <main className="flex flex-col items-center justify-center min-h-screen pt-20 pb-8 px-4" style={{background: '#0a0a0a'}}>
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-2xl font-bold mb-6 text-center">Entrar na sua conta</h1>
          
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{background: '#2a1a1a', color: '#ff6b6b', border: '1px solid #5c2a2a'}}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{color: '#e5e5e5'}}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium mb-2" style={{color: '#e5e5e5'}}>
                Senha
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
                required
                className="w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-3 px-4 text-white font-semibold transition disabled:opacity-50"
              style={{
                background: 'linear-gradient(to right, #ff8c42, #ff6b35)',
              }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span style={{color: '#9ca3af'}}>
              Não tem uma conta?{' '}
              <a href="/cadastro" style={{color: '#ff8c42'}} className="hover:underline">
                Cadastre-se
              </a>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}