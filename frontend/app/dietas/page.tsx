// frontend/app/dietas/page.tsx
'use client'

import { useState, useEffect } from 'react';

type DietaGeral = {
  nome: string;
  descricao: string;
  beneficios: string[];
  alimentos_principais: string[];
  alimentos_evitar: string[];
};

type DietasResponse = {
  dietas: {
    [key: string]: DietaGeral;
  };
};

export default function DietasPage() {
  const [dietas, setDietas] = useState<DietasResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);

  useEffect(() => {
    fetchDietas();
  }, []);

  const fetchDietas = async () => {
    try {
      const res = await fetch('http://localhost:5000/dietas-gerais');
      const data = await res.json();
      setDietas(data);
    } catch (err) {
      console.error('Erro ao carregar dietas:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDietIcon = (key: string) => {
    const icons: { [key: string]: string } = {
      mediterranea: '🌊',
      low_carb: '🥩',
      vegetariana: '🥬',
      flexivel: '⚖️'
    };
    return icons[key] || '🍽️';
  };

  const getDietColor = (key: string) => {
    const colors: { [key: string]: { bg: string; border: string } } = {
      mediterranea: { bg: 'rgba(96, 165, 250, 0.1)', border: 'rgba(96, 165, 250, 0.3)' },
      low_carb: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)' },
      vegetariana: { bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.3)' },
      flexivel: { bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)' }
    };
    return colors[key] || { bg: 'rgba(156, 163, 175, 0.1)', border: 'rgba(156, 163, 175, 0.3)' };
  };

  return (
    <main style={{minHeight: '100vh', padding: '2rem 1rem', maxWidth: '1400px', margin: '0 auto'}}>
      {/* Header */}
      <div style={{marginBottom: '2rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem'}}>
          <div>
            <h1 style={{fontSize: 'clamp(1.875rem, 4vw, 2.25rem)', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', flexWrap: 'wrap'}}>
              <span style={{color: '#ff8c42'}}>📚</span>
              Dietas Disponíveis
            </h1>
            <p style={{color: '#9ca3af', fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>
              Conheça diferentes tipos de dietas e seus benefícios
            </p>
          </div>
          <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
            <a
              href="/saude"
              style={{padding: '0.625rem 1rem', background: '#1a1a1a', color: '#ff8c42', borderRadius: '0.5rem', border: '1px solid rgba(255, 140, 66, 0.3)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', whiteSpace: 'nowrap'}}
            >
              💪 Saúde
            </a>
            <a
              href="/"
              style={{padding: '0.625rem 1rem', background: '#1a1a1a', color: '#9ca3af', borderRadius: '0.5rem', border: '1px solid #2a2a2a', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', whiteSpace: 'nowrap'}}
            >
              ← Voltar
            </a>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{textAlign: 'center', padding: '3rem 0'}}>
          <div style={{display: 'inline-block', width: '48px', height: '48px', border: '4px solid #ff8c42', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
          <p style={{color: '#9ca3af', marginTop: '1rem'}}>Carregando dietas...</p>
        </div>
      ) : (
        <>
          {/* Grid de Dietas */}
          <div style={{display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem'}}>
            {dietas && Object.entries(dietas.dietas).map(([key, dieta]) => {
              const colors = getDietColor(key);
              return (
                <div
                  key={key}
                  style={{
                    background: colors.bg,
                    border: `2px solid ${selectedDiet === key ? '#ff8c42' : colors.border}`,
                    borderRadius: '1rem',
                    padding: '1.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setSelectedDiet(selectedDiet === key ? null : key)}
                  onMouseEnter={(e) => {
                    if (selectedDiet !== key) {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = colors.border;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    if (selectedDiet !== key) {
                      e.currentTarget.style.borderColor = colors.border;
                    }
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1}}>
                      <span style={{fontSize: '3rem'}}>{getDietIcon(key)}</span>
                      <div style={{flex: 1}}>
                        <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.25rem'}}>
                          {dieta.nome}
                        </h2>
                        <p style={{fontSize: '0.875rem', color: '#9ca3af', margin: 0}}>
                          {dieta.descricao}
                        </p>
                      </div>
                    </div>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      fontSize: '1.5rem',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      lineHeight: 1
                    }}>
                      {selectedDiet === key ? '−' : '+'}
                    </button>
                  </div>

                  {/* Benefícios sempre visíveis */}
                  <div style={{marginBottom: selectedDiet === key ? '1.25rem' : 0}}>
                    <h3 style={{fontWeight: '600', color: '#ff8c42', marginBottom: '0.75rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      ✨ Benefícios
                    </h3>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                      {dieta.beneficios.map((beneficio, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '0.5rem 0.875rem',
                            background: '#1a1a1a',
                            borderRadius: '1.5rem',
                            fontSize: '0.8125rem',
                            color: '#d1d5db',
                            border: '1px solid #2a2a2a'
                          }}
                        >
                          {beneficio}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Detalhes expandidos */}
                  {selectedDiet === key && (
                    <div style={{paddingTop: '1.25rem', borderTop: '1px solid #2a2a2a', display: 'flex', flexDirection: 'column', gap: '1.25rem'}} className="animate-fadeIn">
                      <div>
                        <h3 style={{fontWeight: '600', color: '#34d399', marginBottom: '0.75rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          ✅ Alimentos Principais
                        </h3>
                        <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #2a2a2a'}}>
                          <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                            {dieta.alimentos_principais.map((alimento, idx) => (
                              <li key={idx} style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#d1d5db', fontSize: '0.875rem'}}>
                                <span style={{color: '#34d399', marginTop: '0.125rem', fontWeight: 'bold'}}>•</span>
                                <span>{alimento}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 style={{fontWeight: '600', color: '#ef4444', marginBottom: '0.75rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          ❌ Alimentos a Evitar
                        </h3>
                        <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #2a2a2a'}}>
                          <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                            {dieta.alimentos_evitar.map((alimento, idx) => (
                              <li key={idx} style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#d1d5db', fontSize: '0.875rem'}}>
                                <span style={{color: '#ef4444', marginTop: '0.125rem', fontWeight: 'bold'}}>•</span>
                                <span>{alimento}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Seção de Comparação */}
          <div style={{background: 'rgba(255, 140, 66, 0.05)', border: '1px solid rgba(255, 140, 66, 0.2)', borderRadius: '1rem', padding: '1.75rem', marginBottom: '2rem'}}>
            <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#ff8c42', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              🔍 Como Escolher a Dieta Ideal?
            </h2>

            <div style={{display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)', gap: '1.5rem'}}>
              <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #2a2a2a'}}>
                <h3 style={{fontWeight: '600', color: '#fff', marginBottom: '1rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  🎯 Considere seus Objetivos
                </h3>
                <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                  <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem'}}>
                    <span style={{color: '#ff8c42', marginTop: '0.125rem'}}>•</span>
                    <span style={{color: '#9ca3af'}}>
                      <strong style={{color: '#d1d5db'}}>Perda de peso:</strong> Low Carb ou Mediterrânea
                    </span>
                  </li>
                  <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem'}}>
                    <span style={{color: '#ff8c42', marginTop: '0.125rem'}}>•</span>
                    <span style={{color: '#9ca3af'}}>
                      <strong style={{color: '#d1d5db'}}>Saúde cardiovascular:</strong> Mediterrânea ou Vegetariana
                    </span>
                  </li>
                  <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem'}}>
                    <span style={{color: '#ff8c42', marginTop: '0.125rem'}}>•</span>
                    <span style={{color: '#9ca3af'}}>
                      <strong style={{color: '#d1d5db'}}>Sustentabilidade:</strong> Vegetariana ou Flexível
                    </span>
                  </li>
                  <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem'}}>
                    <span style={{color: '#ff8c42', marginTop: '0.125rem'}}>•</span>
                    <span style={{color: '#9ca3af'}}>
                      <strong style={{color: '#d1d5db'}}>Controle glicêmico:</strong> Low Carb
                    </span>
                  </li>
                </ul>
              </div>

              <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #2a2a2a'}}>
                <h3 style={{fontWeight: '600', color: '#fff', marginBottom: '1rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  💡 Dicas Importantes
                </h3>
                <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                  <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem'}}>
                    <span style={{color: '#ff8c42', marginTop: '0.125rem'}}>•</span>
                    <span style={{color: '#9ca3af'}}>Consulte um nutricionista antes de iniciar</span>
                  </li>
                  <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem'}}>
                    <span style={{color: '#ff8c42', marginTop: '0.125rem'}}>•</span>
                    <span style={{color: '#9ca3af'}}>Adapte a dieta ao seu estilo de vida</span>
                  </li>
                  <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem'}}>
                    <span style={{color: '#ff8c42', marginTop: '0.125rem'}}>•</span>
                    <span style={{color: '#9ca3af'}}>Seja consistente e paciente</span>
                  </li>
                  <li style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem'}}>
                    <span style={{color: '#ff8c42', marginTop: '0.125rem'}}>•</span>
                    <span style={{color: '#9ca3af'}}>Monitore seus resultados e ajuste conforme necessário</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div style={{textAlign: 'center', background: 'linear-gradient(135deg, #ff6b35, #ff8c42)', border: 'none', borderRadius: '1rem', padding: '2rem', marginBottom: '1.5rem'}}>
            <h3 style={{fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'white'}}>
              Pronto para começar?
            </h3>
            <p style={{color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1.5rem', fontSize: '1rem'}}>
              Calcule seu IMC e receba uma dieta personalizada baseada nos seus objetivos
            </p>
            <a
              href="/saude"
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
                transition: 'all 0.3s ease'
              }}
            >
              💪 Calcular meu IMC
            </a>
          </div>

          {/* Aviso */}
          <div style={{background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '1rem', padding: '1.25rem'}}>
            <div style={{display: 'flex', gap: '0.75rem'}}>
              <span style={{fontSize: '1.5rem'}}>⚠️</span>
              <div>
                <h3 style={{fontWeight: '600', color: '#fbbf24', marginBottom: '0.5rem', fontSize: '0.875rem'}}>Importante</h3>
                <p style={{fontSize: '0.875rem', color: '#9ca3af', margin: 0, lineHeight: '1.6'}}>
                  As informações apresentadas são apenas educativas e não substituem 
                  orientação médica ou nutricional profissional. Cada pessoa é única 
                  e requer uma abordagem individualizada para alcançar seus objetivos de saúde.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}