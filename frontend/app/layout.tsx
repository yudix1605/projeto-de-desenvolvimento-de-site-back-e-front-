// frontend/app/layout.tsx
'use client'

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Atualiza o título da página
    document.title = 'Dietic - Gerencie sua Alimentação';
    
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

  useEffect(() => {
  // Força a mudança do título
  if (typeof window !== 'undefined') {
    const titles: { [key: string]: string } = {
      '/': 'Dietic - Início',
      '/tela01': 'Dietic - Meus Alimentos',
      '/tela02': 'Dietic - Adicionar Alimento',
      '/saude': 'Dietic - Saúde & Bem-estar',
      '/dietas': 'Dietic - Dietas',
      '/login': 'Dietic - Login',
      '/registro': 'Dietic - Cadastro'
    };
    
    const newTitle = titles[pathname] || 'Dietic - Gerencie sua Alimentação';
    document.title = newTitle;
    console.log('Título atualizado para:', newTitle); // Para debug
  }
}, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/');
    setTimeout(() => window.location.reload(), 100);
  };

  // Páginas que não devem mostrar o navbar
  const hideNavbarPages = ['/login', '/registro'];
  const shouldShowNavbar = !hideNavbarPages.includes(pathname);

  return (
    <html lang="pt-BR">
      <head>
        <title>Dietic - Gerencie sua Alimentação</title>
        <meta name="description" content="Dietic - Sistema de gerenciamento nutricional inteligente" />
        <link rel="icon" href="/image.svg" />
      </head>
      <body style={{margin: 0, padding: 0}}>
        {shouldShowNavbar && (
          <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #2a2a2a'
          }}>
            <div style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {/* Logo */}
              <a href="/" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                transition: 'opacity 0.3s'
              }}>
                <img 
                  src="/image.svg" 
                  alt="Dietic Logo" 
                  style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'contain'
                  }}
                />
                <span style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#ff8c42'
                }}>
                  Dietic
                </span>
              </a>
              
              {/* Desktop Menu */}
              <div style={{
                display: isMobile ? 'none' : 'flex',
                alignItems: 'center',
                gap: '2rem'
              }}>
                <a 
                  href="/" 
                  style={{
                    color: pathname === '/' ? '#ff8c42' : '#9ca3af',
                    fontWeight: pathname === '/' ? '600' : '400',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                >
                  Home
                </a>

                {isLoggedIn ? (
                  <>
                    <a 
                      href="/tela01" 
                      style={{
                        color: pathname === '/tela01' ? '#ff8c42' : '#9ca3af',
                        fontWeight: pathname === '/tela01' ? '600' : '400',
                        fontSize: '0.95rem',
                        textDecoration: 'none',
                        transition: 'color 0.3s'
                      }}
                    >
                      Alimentos
                    </a>
                    <a 
                      href="/tela02" 
                      style={{
                        color: pathname === '/tela02' ? '#ff8c42' : '#9ca3af',
                        fontWeight: pathname === '/tela02' ? '600' : '400',
                        fontSize: '0.95rem',
                        textDecoration: 'none',
                        transition: 'color 0.3s'
                      }}
                    >
                      Adicionar Alimentos
                    </a>
                    <a 
                      href="/saude" 
                      style={{
                        color: pathname === '/saude' ? '#ff8c42' : '#9ca3af',
                        fontWeight: pathname === '/saude' ? '600' : '400',
                        fontSize: '0.95rem',
                        textDecoration: 'none',
                        transition: 'color 0.3s'
                      }}
                    >
                      IMC Calculator
                    </a>
                    <a 
                      href="/dietas" 
                      style={{
                        color: pathname === '/dietas' ? '#ff8c42' : '#9ca3af',
                        fontWeight: pathname === '/dietas' ? '600' : '400',
                        fontSize: '0.95rem',
                        textDecoration: 'none',
                        transition: 'color 0.3s'
                      }}
                    >
                      Dietas
                    </a>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginLeft: '1rem',
                      paddingLeft: '1rem',
                      borderLeft: '1px solid #2a2a2a'
                    }}>
                      <span style={{
                        color: '#9ca3af',
                        fontSize: '0.875rem'
                      }}>
                        Olá, {userName}!
                      </span>
                      <button
                        onClick={handleLogout}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          background: '#1a1a1a',
                          color: '#ff8c42',
                          border: '1px solid rgba(255, 140, 66, 0.3)',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                      >
                        Sair
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                    <a
                      href="/login"
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#1a1a1a',
                        color: '#9ca3af',
                        border: '1px solid #374151',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s'
                      }}
                    >
                      Entrar
                    </a>
                    <a
                      href="/registro"
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        background: 'linear-gradient(to right, #ff8c42, #ff6b35)',
                        color: 'white',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s'
                      }}
                    >
                      Cadastrar
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  display: isMobile ? 'block' : 'none',
                  background: 'transparent',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                <svg style={{width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && isMobile && (
              <div style={{
                borderTop: '1px solid #2a2a2a',
                background: 'rgba(10, 10, 10, 0.98)'
              }}>
                <div style={{
                  padding: '1rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <a href="/" style={{
                    padding: '0.75rem',
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '0.95rem'
                  }}>Home</a>
                  
                  {isLoggedIn ? (
                    <>
                      <a href="/tela01" style={{
                        padding: '0.75rem',
                        color: '#9ca3af',
                        textDecoration: 'none',
                        fontSize: '0.95rem'
                      }}>Alimentos</a>
                      <a href="/tela02" style={{
                        padding: '0.75rem',
                        color: '#9ca3af',
                        textDecoration: 'none',
                        fontSize: '0.95rem'
                      }}>Adicionar</a>
                      <a href="/saude" style={{
                        padding: '0.75rem',
                        color: '#9ca3af',
                        textDecoration: 'none',
                        fontSize: '0.95rem'
                      }}>Saúde</a>
                      <a href="/dietas" style={{
                        padding: '0.75rem',
                        color: '#9ca3af',
                        textDecoration: 'none',
                        fontSize: '0.95rem'
                      }}>Dietas</a>
                      <button
                        onClick={handleLogout}
                        style={{
                          padding: '0.75rem',
                          textAlign: 'left',
                          color: '#ff8c42',
                          background: 'transparent',
                          border: 'none',
                          fontSize: '0.95rem',
                          cursor: 'pointer'
                        }}
                      >
                        Sair
                      </button>
                    </>
                  ) : (
                    <>
                      <a href="/login" style={{
                        padding: '0.75rem',
                        color: '#9ca3af',
                        textDecoration: 'none',
                        fontSize: '0.95rem'
                      }}>Entrar</a>
                      <a href="/registro" style={{
                        padding: '0.75rem',
                        color: '#ff8c42',
                        textDecoration: 'none',
                        fontSize: '0.95rem'
                      }}>Cadastrar</a>
                    </>
                  )}
                </div>
              </div>
            )}
          </nav>
        )}
        
        <main style={{paddingTop: shouldShowNavbar ? '80px' : '0'}}>
          {children}
        </main>

        <footer style={{
          textAlign: 'center',
          padding: '2rem 0',
          borderTop: '1px solid #2a2a2a',
          background: '#0a0a0a',
          color: '#6b7280'
        }}>
          <p style={{fontSize: '0.875rem', margin: 0}}>© 2025 Dietic - Feito com 🧡</p>
        </footer>
      </body>
    </html>
  );
}