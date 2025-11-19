// frontend/app/page.tsx
'use client'

import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Verifica se o usuário está logado
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(user).nome);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <main className="flex flex-col items-center min-h-screen pt-20 pb-8 px-4" style={{background: '#0a0a0a'}}>
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255, 140, 66, 0.1) 0%, transparent 50%)'
        }}
      />

      {/* Header com botão de logout/login */}
      <div className="absolute top-6 right-6 z-20">
        {isLoggedIn ? (
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <span style={{color: '#9ca3af'}}>Olá, {userName}!</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg transition"
              style={{
                background: '#1a1a1a',
                color: '#ff8c42',
                border: '1px solid rgba(255, 140, 66, 0.3)'
              }}
            >
              Sair
            </button>
          </div>
        ) : (
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <a
              href="/login"
              className="px-4 py-2 rounded-lg transition"
              style={{
                background: '#1a1a1a',
                color: '#9ca3af',
                border: '1px solid #374151'
              }}
            >
              Entrar
            </a>
            <a
              href="/registro"
              className="px-4 py-2 rounded-lg transition"
              style={{
                background: 'linear-gradient(to right, #ff8c42, #ff6b35)',
                color: 'white'
              }}
            >
              Cadastrar
            </a>
          </div>
        )}
      </div>
      
      <header className="mb-16 text-center relative z-10">
        <div className="inline-block mb-4">
          <span className="text-6xl">🍊</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-4 tracking-tight" style={{color: '#ffffff'}}>
          Alimente sua saúde
          <br />
          <span style={{
            background: 'linear-gradient(to right, #ff8c42, #ff6b35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            com equilíbrio
          </span>
        </h1>
        <p className="text-lg max-w-md mx-auto" style={{color: '#9ca3af'}}>
          Gerencie sua dieta e acompanhe seus alimentos com praticidade e estilo.
        </p>
      </header>

      <div className="flex flex-col w-full max-w-md gap-4 my-8 relative z-10">
        <a
          href="/alimentos"
          className="rounded-2xl py-5 px-6 text-white text-lg font-semibold transition text-center hover:shadow-2xl"
          style={{
            background: 'linear-gradient(to right, #ff8c42, #ff6b35)',
            boxShadow: '0 10px 40px rgba(255, 140, 66, 0.3)'
          }}
        >
          <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
            <span>📋</span>
            Ver Alimentos
          </span>
        </a>
        
        <a
          href="/alimentos/novo"
          className="rounded-2xl py-5 px-6 text-lg font-semibold transition text-center hover:bg-gray-900"
          style={{
            background: '#1a1a1a',
            color: '#ff8c42',
            border: '2px solid rgba(255, 140, 66, 0.3)'
          }}
        >
          <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
            <span>➕</span>
            Novo Alimento
          </span>
        </a>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-12 text-center relative z-10">
        <div>
          <div className="text-3xl font-bold mb-1" style={{color: '#ff8c42'}}>100+</div>
          <div className="text-sm" style={{color: '#6b7280'}}>Alimentos</div>
        </div>
        <div>
          <div className="text-3xl font-bold mb-1" style={{color: '#ff8c42'}}>24/7</div>
          <div className="text-sm" style={{color: '#6b7280'}}>Disponível</div>
        </div>
        <div>
          <div className="text-3xl font-bold mb-1" style={{color: '#ff8c42'}}>∞</div>
          <div className="text-sm" style={{color: '#6b7280'}}>Possibilidades</div>
        </div>
      </div>

      <footer className="mt-auto text-sm pt-16 relative z-10" style={{color: '#6b7280'}}>
        © 2025 Dietic - Feito com 🧡
      </footer>
    </main>
  );
}