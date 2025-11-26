// ============================================
// ARQUIVO 1: frontend/app/page.tsx (HOME)
// ============================================

'use client'

import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <main style={{background: '#0a0a0a', minHeight: '100vh'}}>
      {/* Background gradient */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 0%, rgba(255, 107, 53, 0.15) 0%, transparent 60%)'
        }}
      />
      
      {/* Hero Section */}
      <section style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{marginBottom: '2rem'}}>
          <img 
            src="/image.svg" 
            alt="Dietic Logo" 
            style={{
              width: '144px',
              height: '144px',
              margin: '0 auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 40px rgba(255, 107, 53, 0.3))'
            }}
          />
        </div>
        
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.75rem)',
          fontWeight: 'bold',
          lineHeight: '1.2',
          marginBottom: '2rem',
          color: '#ffffff',
          padding: '0 1rem'
        }}>
          Alimente sua saúde com
          <br />
          <span style={{
            background: 'linear-gradient(to right, #ff6b35, #ff8c42)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            equilíbrio
          </span>
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1.5rem',
          width: '100%',
          maxWidth: '600px',
          padding: '0 1rem'
        }}>
          {isLoggedIn ? (
            <>
              <a
                href="/tela01"
                style={{
                  width: isMobile ? '100%' : 'auto',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 10px 40px rgba(255, 107, 53, 0.4)',
                  minWidth: '200px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                Ver Alimentos
              </a>
              <a
                href="/saude"
                style={{
                  width: isMobile ? '100%' : 'auto',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  background: '#1a1a1a',
                  color: '#ff8c42',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 140, 66, 0.3)',
                  minWidth: '200px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                Calcular IMC
              </a>
            </>
          ) : (
            <>
              <a
                href="/registro"
                style={{
                  width: isMobile ? '100%' : 'auto',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 10px 40px rgba(255, 107, 53, 0.4)',
                  minWidth: '200px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                Começar Agora
              </a>
              <a
                href="#sobre"
                style={{
                  width: isMobile ? '100%' : 'auto',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                  background: '#1a1a1a',
                  color: '#ff8c42',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 140, 66, 0.3)',
                  minWidth: '200px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                Saiba Mais
              </a>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: '1.5rem',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto 8rem',
        position: 'relative',
        zIndex: 10,
        padding: '0 1rem'
      }}>
        {[
          { icon: '📊', titulo: 'Controle Total', desc: 'Gerencie alimentos e informações nutricionais em um só lugar' },
          { icon: '💪', titulo: 'Saúde em Foco', desc: 'Calcule seu IMC e receba dietas personalizadas' },
          { icon: '🎯', titulo: 'Seus Objetivos', desc: 'Acompanhe macros e calorias com precisão' }
        ].map((feature, idx) => (
          <div key={idx} style={{
            background: '#151515',
            border: '1px solid #2a2a2a',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 140, 66, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = '#2a2a2a';
          }}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{feature.icon}</div>
            <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#ff8c42'}}>
              {feature.titulo}
            </h3>
            <p style={{lineHeight: '1.5', fontSize: '0.875rem', color: '#9ca3af'}}>
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Sobre Section */}
      <section id="sobre" style={{
        maxWidth: '1200px',
        width: '100%',
        position: 'relative',
        zIndex: 10,
        margin: '8rem auto 4rem',
        padding: '0 1rem'
      }}>
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Sobre o <span style={{
              background: 'linear-gradient(to right, #ff6b35, #ff8c42)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Dietic</span>
          </h2>
        </div>

        <div style={{
          background: '#151515',
          border: '1px solid #2a2a2a',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2.5rem'
        }}>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap'}}>
            <span style={{fontSize: '3rem'}}>🎯</span>
            <div style={{flex: 1, minWidth: '250px'}}>
              <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ff8c42'}}>
                Nossa Missão
              </h3>
              <p style={{color: '#d1d5db', lineHeight: '1.7', fontSize: '1rem'}}>
                Simplificar o controle alimentar e nutricional, tornando mais fácil 
                fazer escolhas conscientes e saudáveis no dia a dia.
              </p>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {[
            { icon: '📊', titulo: 'Gestão Completa', desc: 'Cadastre e gerencie alimentos com informações nutricionais' },
            { icon: '🔍', titulo: 'Busca Rápida', desc: 'Encontre qualquer alimento rapidamente' },
            { icon: '💪', titulo: 'Cálculo de IMC', desc: 'Calcule seu IMC e receba dietas personalizadas' },
            { icon: '🎨', titulo: 'Interface Moderna', desc: 'Design intuitivo e elegante' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#151515',
              border: '1px solid #2a2a2a',
              borderRadius: '1rem',
              padding: '1.5rem',
              transition: 'all 0.3s ease'
            }}>
              <div style={{display: 'flex', gap: '0.75rem', alignItems: 'flex-start'}}>
                <span style={{fontSize: '2.5rem'}}>{item.icon}</span>
                <div>
                  <h4 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ff8c42'}}>
                    {item.titulo}
                  </h4>
                  <p style={{lineHeight: '1.5', fontSize: '0.875rem', color: '#9ca3af'}}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isLoggedIn && (
          <div style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
            border: 'none',
            borderRadius: '1rem',
            padding: '2rem'
          }}>
            <h3 style={{fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white'}}>
              Pronto para começar?
            </h3>
            <p style={{color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1.5rem', fontSize: '1rem'}}>
              Cadastre-se e comece a gerenciar sua alimentação
            </p>
            <a
              href="/registro"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                borderRadius: '0.75rem',
                background: 'white',
                color: '#ff8c42',
                fontWeight: '600',
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              Criar Conta Grátis
            </a>
          </div>
        )}
      </section>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '3rem',
        marginTop: '2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        maxWidth: '800px',
        margin: '2rem auto 0',
        padding: '0 1rem'
      }}>
        <div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ff8c42'}}>100+</div>
          <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Alimentos</div>
        </div>
        <div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ff8c42'}}>24/7</div>
          <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Disponível</div>
        </div>
        <div>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ff8c42'}}>∞</div>
          <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Possibilidades</div>
        </div>
      </div>
    </main>
  );
}