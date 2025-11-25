// frontend/app/page.tsx
'use client'

import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen pb-8 px-4" style={{background: '#0a0a0a'}}>
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255, 107, 53, 0.15) 0%, transparent 60%)'
        }}
      />
      
      {/* Hero Section */}
      <section className="mt-16 mb-20 text-center relative z-10 max-w-3xl mx-auto">
        <div className="inline-block mb-6">
          <img 
            src="/image.svg" 
            alt="Dietic Logo" 
            className="w-32 h-32 mx-auto object-contain"
            style={{filter: 'drop-shadow(0 10px 40px rgba(255, 107, 53, 0.3))'}}
          />
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6 tracking-tight" style={{color: '#ffffff'}}>
          Alimente sua saúde
          <br />
          <span style={{
            background: 'linear-gradient(to right, #ff6b35, #ff8c42)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            com equilíbrio
          </span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{color: '#9ca3af'}}>
        
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {isLoggedIn ? (
            <>
              <a
                href="/tela01"
                className="rounded-2xl py-4 px-10 text-white text-lg font-semibold transition hover:shadow-2xl hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
                  boxShadow: '0 10px 40px rgba(255, 107, 53, 0.4)'
                }}
              >
                Ver Alimentos
              </a>
              <a
                href="/tela02"
                className="rounded-2xl py-4 px-10 text-lg font-semibold transition hover:bg-gray-900 hover:scale-105"
                style={{
                  background: '#1a1a1a',
                  color: '#ff8c42',
                  border: '2px solid rgba(255, 140, 66, 0.3)'
                }}
              >
                Novo Alimento
              </a>
            </>
          ) : (
            <>
              <a
                href="/cadastro"
                className="rounded-2xl py-4 px-10 text-white text-lg font-semibold transition hover:shadow-2xl hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
                  boxShadow: '0 10px 40px rgba(255, 107, 53, 0.4)'
                }}
              >
                Começar Agora
              </a>
              <a
                href="#sobre"
                className="rounded-2xl py-4 px-10 text-lg font-semibold transition hover:bg-gray-900 hover:scale-105"
                style={{
                  background: '#1a1a1a',
                  color: '#ff8c42',
                  border: '2px solid rgba(255, 140, 66, 0.3)'
                }}
              >
                Saiba Mais
              </a>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-20 relative z-10 px-4">
        <div className="card text-center hover:scale-105 transition-transform">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-3" style={{color: '#ff8c42'}}>Controle Total</h3>
          <p className="leading-relaxed" style={{color: '#9ca3af'}}>
            Gerencie todos os seus alimentos e informações nutricionais em um só lugar
          </p>
        </div>
        
        <div className="card text-center hover:scale-105 transition-transform">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-3" style={{color: '#ff8c42'}}>Rápido e Fácil</h3>
          <p className="leading-relaxed" style={{color: '#9ca3af'}}>
            Interface intuitiva para adicionar e buscar alimentos em segundos
          </p>
        </div>
        
        <div className="card text-center hover:scale-105 transition-transform">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-3" style={{color: '#ff8c42'}}>Seus Objetivos</h3>
          <p className="leading-relaxed" style={{color: '#9ca3af'}}>
            Acompanhe calorias, proteínas, carboidratos e gorduras com precisão
          </p>
        </div>
      </section>

      {/* Sobre Nós Section */}
      <section id="sobre" className="max-w-5xl w-full relative z-10 mb-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: '#ffffff'}}>
            Sobre o <span style={{
              background: 'linear-gradient(to right, #ff6b35, #ff8c42)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Dietic</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{color: '#9ca3af'}}>
          </p>
        </div>

        {/* Mission */}
        <div className="card mb-10 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <span className="text-5xl">🎯</span>
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{color: '#ff8c42'}}>
                Nossa Missão
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                O Dietic foi criado com o objetivo de simplificar o controle alimentar e nutricional. 
                Acreditamos que todos merecem ter acesso fácil às informações sobre os alimentos que 
                consomem, permitindo escolhas mais conscientes e saudáveis no dia a dia.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold mb-8 text-center" style={{color: '#ffffff'}}>
            O que oferecemos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card hover:scale-105 transition-transform">
              <div className="flex items-start gap-3">
                <span className="text-4xl">📊</span>
                <div>
                  <h4 className="text-xl font-semibold mb-2" style={{color: '#ff8c42'}}>
                    Gestão Completa
                  </h4>
                  <p className="leading-relaxed" style={{color: '#9ca3af'}}>
                    Cadastre, edite e gerencie todos os seus alimentos com informações nutricionais detalhadas
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:scale-105 transition-transform">
              <div className="flex items-start gap-3">
                <span className="text-4xl">🔍</span>
                <div>
                  <h4 className="text-xl font-semibold mb-2" style={{color: '#ff8c42'}}>
                    Busca Rápida
                  </h4>
                  <p className="leading-relaxed" style={{color: '#9ca3af'}}>
                    Encontre rapidamente qualquer alimento da sua base com nosso sistema de busca inteligente
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:scale-105 transition-transform">
              <div className="flex items-start gap-3">
                <span className="text-4xl">📈</span>
                <div>
                  <h4 className="text-xl font-semibold mb-2" style={{color: '#ff8c42'}}>
                    Informações Precisas
                  </h4>
                  <p className="leading-relaxed" style={{color: '#9ca3af'}}>
                    Acompanhe calorias, proteínas, carboidratos e gorduras de cada alimento
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:scale-105 transition-transform">
              <div className="flex items-start gap-3">
                <span className="text-4xl">🎨</span>
                <div>
                  <h4 className="text-xl font-semibold mb-2" style={{color: '#ff8c42'}}>
                    Interface Moderna
                  </h4>
                  <p className="leading-relaxed" style={{color: '#9ca3af'}}>
                    Design intuitivo e elegante que torna o gerenciamento nutricional mais agradável
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="card mb-12 max-w-4xl mx-auto" style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 140, 66, 0.05) 100%)',
          borderColor: 'rgba(255, 140, 66, 0.2)'
        }}>
          <h3 className="text-2xl font-bold mb-8 text-center" style={{color: '#ff8c42'}}>
            Nossos Valores
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-3">💪</div>
              <h4 className="font-semibold mb-2 text-lg" style={{color: '#ffffff'}}>Saúde em Primeiro Lugar</h4>
              <p className="text-sm leading-relaxed" style={{color: '#9ca3af'}}>
                Facilitamos o cuidado com sua alimentação
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-semibold mb-2 text-lg" style={{color: '#ffffff'}}>Simplicidade</h4>
              <p className="text-sm leading-relaxed" style={{color: '#9ca3af'}}>
                Interface fácil de usar para todos
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-3">🔒</div>
              <h4 className="font-semibold mb-2 text-lg" style={{color: '#ffffff'}}>Privacidade</h4>
              <p className="text-sm leading-relaxed" style={{color: '#9ca3af'}}>
                Seus dados são sempre protegidos
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        {!isLoggedIn && (
          <div className="text-center card max-w-3xl mx-auto" style={{
            background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
            border: 'none'
          }}>
            <h3 className="text-3xl font-bold mb-4 text-white">
              Pronto para começar?
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Cadastre-se agora e comece a gerenciar sua alimentação de forma inteligente
            </p>
            <a
              href="/cadastro"
              className="inline-block px-10 py-4 rounded-xl font-semibold transition hover:scale-105"
              style={{
                background: 'white',
                color: '#ff8c42',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
            >
              Criar Conta Grátis
            </a>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-12 mt-8 text-center relative z-10 max-w-2xl mx-auto">
        <div>
          <div className="text-4xl font-bold mb-2" style={{color: '#ff8c42'}}>100+</div>
          <div className="text-sm" style={{color: '#6b7280'}}>Alimentos</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2" style={{color: '#ff8c42'}}>24/7</div>
          <div className="text-sm" style={{color: '#6b7280'}}>Disponível</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2" style={{color: '#ff8c42'}}>∞</div>
          <div className="text-sm" style={{color: '#6b7280'}}>Possibilidades</div>
        </div>
      </div>
    </main>
  );
}