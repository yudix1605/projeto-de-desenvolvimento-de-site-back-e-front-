// frontend/app/layout.tsx
'use client'

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      try {
        setUserName(JSON.parse(user).nome);
      } catch (e) {
        console.error('Erro ao parsear usuário');
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/');
    setTimeout(() => window.location.reload(), 100);
  };

  // Páginas que não devem mostrar o navbar
  const hideNavbarPages = ['/login', '/cadastro'];
  const shouldShowNavbar = !hideNavbarPages.includes(pathname);

  return (
    <html lang="pt">
      <body>
        {shouldShowNavbar && (
          <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            borderColor: '#2a2a2a'
          }}>
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <a href="/" className="flex items-center gap-3 hover:opacity-80 transition">
                <img 
                  src= "/image.svg" 
                  alt="Dietic Logo" 
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-bold" style={{color: '#ff8c42'}}>Dietic</span>
              </a>
              
              <div className="flex items-center gap-6">
                <a 
                  href="/" 
                  className="text-gray-400 hover:text-orange-500 transition"
                  style={pathname === '/' ? {color: '#ff8c42', fontWeight: '600'} : {}}
                >
                  Home
                </a>

                
                {isLoggedIn ? (
                  <>
                    <a 
                      href="/tela01" 
                      className="text-gray-400 hover:text-orange-500 transition"
                      style={pathname === '/tela01' ? {color: '#ff8c42', fontWeight: '600'} : {}}
                    >
                      Meus Alimentos
                    </a>
                    <a 
                      href="/tela02" 
                      className="text-gray-400 hover:text-orange-500 transition"
                      style={pathname === '/tela02' ? {color: '#ff8c42', fontWeight: '600'} : {}}
                    >
                      Adicionar
                    </a>
                    <div className="flex items-center gap-3 ml-2">
                      <span className="text-gray-400 text-sm">Olá, {userName}!</span>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg transition hover:bg-orange-500/10"
                        style={{
                          background: '#1a1a1a',
                          color: '#ff8c42',
                          border: '1px solid rgba(255, 140, 66, 0.3)'
                        }}
                      >
                        Sair
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <a
                      href="/login"
                      className="px-4 py-2 rounded-lg transition hover:bg-gray-800"
                      style={{
                        background: '#1a1a1a',
                        color: '#9ca3af',
                        border: '1px solid #374151'
                      }}
                    >
                      Entrar
                    </a>
                    <a
                      href="/cadastro"
                      className="px-4 py-2 rounded-lg transition hover:opacity-90"
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
            </div>
          </nav>
        )}
        
        <main style={{paddingTop: shouldShowNavbar ? '80px' : '0'}}>
          {children}
        </main>

        <footer className="text-center py-8 border-t" style={{
          background: '#0a0a0a',
          borderColor: '#2a2a2a',
          color: '#6b7280'
        }}>
          <p className="text-sm">© 2025 Dietic - Feito com 🧡</p>
        </footer>
      </body>
    </html>
  );
}