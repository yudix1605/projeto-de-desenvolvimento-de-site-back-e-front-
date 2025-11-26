// frontend/app/saude/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type IMCData = {
  imc: number | null;
  classificacao: string | null;
  peso: number | null;
  altura: number | null;
};

type AlimentoSugerido = {
  nome: string;
  calorias: number;
  proteinas?: number;
  carboidratos?: number;
};

type SeusAlimentos = {
  proteicos?: AlimentoSugerido[];
  carboidratos?: AlimentoSugerido[];
  balanceados?: AlimentoSugerido[];
  low_cal?: AlimentoSugerido[];
};

type Dieta = {
  nome: string;
  objetivo: string;
  calorias_diarias: string;
  distribuicao: string;
  recomendacoes: string[];
  alimentos_sugeridos: string[];
  seus_alimentos?: SeusAlimentos;
};

export default function SaudePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [loading, setLoading] = useState(false);
  const [imcData, setImcData] = useState<IMCData>({
    imc: null,
    classificacao: null,
    peso: null,
    altura: null
  });
  const [dietaSugerida, setDietaSugerida] = useState<Dieta | null>(null);
  const [showDieta, setShowDieta] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }
    
    try {
      const userData = JSON.parse(user);
      setUserId(userData.id);
      
      if (userData.id) {
        fetchIMC(userData.id);
      }
    } catch (e) {
      console.error('Erro ao carregar usuário');
      router.push('/login');
    }
  }, [router]);

  const fetchIMC = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}/imc`);
      if (res.ok) {
        const data = await res.json();
        setImcData(data);
        if (data.peso) setPeso(data.peso.toString());
        if (data.altura) setAltura(data.altura.toString());
      }
    } catch (err) {
      console.error('Erro ao carregar IMC:', err);
    }
  };

  const handleCalcularIMC = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`http://localhost:5000/users/${userId}/imc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          peso: parseFloat(peso),
          altura: parseFloat(altura)
        })
      });

      const data = await res.json();

      if (res.ok) {
        setImcData(data);
        setShowDieta(false);
      } else {
        setError(data.error || 'Erro ao calcular IMC');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleVerDietaSugerida = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`http://localhost:5000/users/${userId}/dieta-sugerida`);
      const data = await res.json();

      if (res.ok) {
        setDietaSugerida(data.dieta);
        setShowDieta(true);
      } else {
        setError(data.error || 'Erro ao buscar dieta');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const getIMCColor = (imc: number | null) => {
    if (!imc) return '#9ca3af';
    if (imc < 18.5) return '#60a5fa';
    if (imc < 25) return '#34d399';
    if (imc < 30) return '#fbbf24';
    if (imc < 35) return '#fb923c';
    return '#ef4444';
  };

  const getIMCBgColor = (imc: number | null) => {
    if (!imc) return 'rgba(156, 163, 175, 0.1)';
    if (imc < 18.5) return 'rgba(96, 165, 250, 0.1)';
    if (imc < 25) return 'rgba(52, 211, 153, 0.1)';
    if (imc < 30) return 'rgba(251, 191, 36, 0.1)';
    if (imc < 35) return 'rgba(251, 146, 60, 0.1)';
    return 'rgba(239, 68, 68, 0.1)';
  };

  const getIMCBorderColor = (imc: number | null) => {
    if (!imc) return 'rgba(156, 163, 175, 0.3)';
    if (imc < 18.5) return 'rgba(96, 165, 250, 0.3)';
    if (imc < 25) return 'rgba(52, 211, 153, 0.3)';
    if (imc < 30) return 'rgba(251, 191, 36, 0.3)';
    if (imc < 35) return 'rgba(251, 146, 60, 0.3)';
    return 'rgba(239, 68, 68, 0.3)';
  };

  const getClassificacaoIcon = (classificacao: string | null) => {
    if (!classificacao) return '❓';
    if (classificacao === 'Abaixo do peso') return '📉';
    if (classificacao === 'Peso normal') return '✅';
    if (classificacao === 'Sobrepeso') return '⚠️';
    return '🔴';
  };

  const referenceData = [
    { nome: 'Abaixo do peso', faixa: '< 18.5', bgColor: 'rgba(96, 165, 250, 0.1)', borderColor: 'rgba(96, 165, 250, 0.3)', textColor: '#60a5fa', desc: 'Pode indicar desnutrição' },
    { nome: 'Peso normal', faixa: '18.5 - 24.9', bgColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)', textColor: '#34d399', desc: 'Faixa saudável' },
    { nome: 'Sobrepeso', faixa: '25 - 29.9', bgColor: 'rgba(251, 191, 36, 0.1)', borderColor: 'rgba(251, 191, 36, 0.3)', textColor: '#fbbf24', desc: 'Atenção à saúde' },
    { nome: 'Obesidade I', faixa: '30 - 34.9', bgColor: 'rgba(251, 146, 60, 0.1)', borderColor: 'rgba(251, 146, 60, 0.3)', textColor: '#fb923c', desc: 'Requer atenção' },
    { nome: 'Obesidade II', faixa: '35 - 39.9', bgColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', textColor: '#ef4444', desc: 'Acompanhamento' },
    { nome: 'Obesidade III', faixa: '≥ 40', bgColor: 'rgba(220, 38, 38, 0.1)', borderColor: 'rgba(220, 38, 38, 0.3)', textColor: '#dc2626', desc: 'Urgente' }
  ];

  return (
    <main style={{minHeight: '100vh', padding: '2rem 1rem', maxWidth: '1400px', margin: '0 auto'}}>
      <div style={{marginBottom: '2rem'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem'}}>
          <div>
            <h1 style={{fontSize: 'clamp(1.875rem, 4vw, 2.25rem)', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff'}}>
              <span style={{color: '#ff8c42'}}>💪</span>
              Saúde & Bem-estar
            </h1>
            <p style={{color: '#9ca3af', fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>
              Calcule seu IMC e receba sugestões personalizadas
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div style={{marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: '0.875rem'}}>
          {error}
        </div>
      )}

      <div style={{display: 'grid', gridTemplateColumns: window.innerWidth >= 1024 ? 'repeat(2, 1fr)' : '1fr', gap: '1.5rem'}}>
        {/* Formulário */}
        <div style={{background: '#151515', border: '1px solid #2a2a2a', borderRadius: '1rem', padding: '1.75rem'}}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#ff8c42', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            📊 Calcular IMC
          </h2>

          <form onSubmit={handleCalcularIMC} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db', marginBottom: '0.5rem'}}>
                Peso (kg) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Ex: 70.5"
                style={{width: '100%', background: '#1a1a1a', border: '2px solid #2a2a2a', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#fff', fontSize: '1rem'}}
              />
            </div>

            <div>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db', marginBottom: '0.5rem'}}>
                Altura (m) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Ex: 1.75"
                style={{width: '100%', background: '#1a1a1a', border: '2px solid #2a2a2a', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: '#fff', fontSize: '1rem'}}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{width: '100%', padding: '1rem', background: loading ? '#666' : 'linear-gradient(to right, #ff8c42, #ff6b35)', color: 'white', borderRadius: '0.75rem', fontWeight: '600', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem', boxShadow: '0 10px 25px rgba(255, 140, 66, 0.25)', opacity: loading ? 0.5 : 1}}
            >
              {loading ? 'Calculando...' : '🧮 Calcular IMC'}
            </button>
          </form>

          {imcData.imc && (
            <div style={{marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #2a2a2a'}}>
              <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                <div style={{display: 'inline-block', padding: '1.5rem', borderRadius: '1rem', background: getIMCBgColor(imcData.imc), border: `2px solid ${getIMCBorderColor(imcData.imc)}`, marginBottom: '1rem'}}>
                  <div style={{fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem', color: getIMCColor(imcData.imc)}}>
                    {imcData.imc}
                  </div>
                  <div style={{fontSize: '0.875rem', color: '#9ca3af'}}>Seu IMC</div>
                </div>
              </div>

              <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #2a2a2a', marginBottom: '1rem'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span style={{color: '#9ca3af', fontSize: '0.875rem'}}>Classificação:</span>
                  <span style={{fontWeight: '600', color: '#ff8c42', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem'}}>
                    {getClassificacaoIcon(imcData.classificacao)}
                    {imcData.classificacao}
                  </span>
                </div>
              </div>

              <button
                onClick={handleVerDietaSugerida}
                disabled={loading}
                style={{width: '100%', padding: '0.875rem', background: '#1a1a1a', color: '#ff8c42', borderRadius: '0.75rem', border: '1px solid rgba(255, 140, 66, 0.3)', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.95rem', opacity: loading ? 0.5 : 1}}
              >
                🍽️ Ver Dieta Sugerida
              </button>
            </div>
          )}
        </div>

        {/* Tabela de Referência */}
        <div style={{background: '#151515', border: '1px solid #2a2a2a', borderRadius: '1rem', padding: '1.75rem'}}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#ff8c42', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            📋 Tabela de Referência
          </h2>

          <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
            {referenceData.map((item, idx) => (
              <div key={idx} style={{background: item.bgColor, border: `1px solid ${item.borderColor}`, borderRadius: '0.75rem', padding: '0.875rem'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
                  <span style={{fontWeight: '600', color: item.textColor, fontSize: '0.875rem'}}>{item.nome}</span>
                  <span style={{fontSize: '0.75rem', color: '#9ca3af'}}>{item.faixa}</span>
                </div>
                <p style={{fontSize: '0.75rem', color: '#9ca3af', margin: 0}}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{marginTop: '1.5rem', padding: '0.875rem', background: 'rgba(255, 140, 66, 0.05)', border: '1px solid rgba(255, 140, 66, 0.2)', borderRadius: '0.75rem'}}>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <span style={{fontSize: '1.25rem'}}>💡</span>
              <div>
                <h3 style={{fontWeight: '600', color: '#ff8c42', marginBottom: '0.25rem', fontSize: '0.875rem'}}>Importante</h3>
                <p style={{fontSize: '0.75rem', color: '#9ca3af', margin: 0}}>
                  O IMC é apenas referência. Consulte um profissional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dieta Sugerida */}
      {showDieta && dietaSugerida && (
        <div style={{marginTop: '1.5rem', background: '#151515', border: '2px solid rgba(255, 140, 66, 0.3)', borderRadius: '1rem', padding: '1.75rem'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem'}}>
            <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#ff8c42', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0}}>
              🍽️ {dietaSugerida.nome}
            </h2>
            <button
              onClick={() => setShowDieta(false)}
              style={{background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '1.5rem'}}
            >
              ✕
            </button>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #2a2a2a'}}>
              <h3 style={{fontWeight: '600', color: '#fff', marginBottom: '0.5rem', fontSize: '0.95rem'}}>🎯 Objetivo</h3>
              <p style={{color: '#9ca3af', fontSize: '0.875rem', margin: 0}}>{dietaSugerida.objetivo}</p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr', gap: '1rem'}}>
              <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #2a2a2a'}}>
                <h3 style={{fontWeight: '600', color: '#fff', marginBottom: '0.5rem', fontSize: '0.875rem'}}>🔥 Calorias</h3>
                <p style={{color: '#ff8c42', fontWeight: 'bold', fontSize: '0.875rem', margin: 0}}>{dietaSugerida.calorias_diarias}</p>
              </div>

              <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #2a2a2a'}}>
                <h3 style={{fontWeight: '600', color: '#fff', marginBottom: '0.5rem', fontSize: '0.875rem'}}>📊 Distribuição</h3>
                <p style={{color: '#9ca3af', fontSize: '0.75rem', margin: 0}}>{dietaSugerida.distribuicao}</p>
              </div>
            </div>

            <div style={{background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #2a2a2a'}}>
              <h3 style={{fontWeight: '600', color: '#fff', marginBottom: '0.875rem', fontSize: '0.95rem'}}>✅ Recomendações</h3>
              <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                {dietaSugerida.recomendacoes.map((rec, idx) => (
                  <li key={idx} style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#9ca3af', fontSize: '0.875rem'}}>
                    <span style={{color: '#ff8c42', marginTop: '0.125rem'}}>•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {dietaSugerida.seus_alimentos && (Object.keys(dietaSugerida.seus_alimentos).some(key => {
              const foods = dietaSugerida.seus_alimentos?.[key as keyof SeusAlimentos];
              return foods && foods.length > 0;
            })) && (
              <div style={{background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '0.75rem', padding: '1rem'}}>
                <h3 style={{fontWeight: '600', color: '#34d399', marginBottom: '0.875rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  🥗 Seus Alimentos Cadastrados
                </h3>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  {dietaSugerida.seus_alimentos.proteicos && dietaSugerida.seus_alimentos.proteicos.length > 0 && (
                    <div>
                      <h4 style={{fontSize: '0.8125rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem'}}>💪 Ricos em Proteína</h4>
                      <div style={{display: 'grid', gridTemplateColumns: window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr', gap: '0.5rem'}}>
                        {dietaSugerida.seus_alimentos.proteicos.map((al, idx) => (
                          <div key={idx} style={{background: '#1a1a1a', borderRadius: '0.5rem', padding: '0.625rem', border: '1px solid #2a2a2a'}}>
                            <div style={{fontSize: '0.875rem', fontWeight: '500', color: '#fff'}}>{al.nome}</div>
                            <div style={{fontSize: '0.75rem', color: '#9ca3af'}}>{al.calorias} kcal | {al.proteinas}g prot</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {dietaSugerida.seus_alimentos.low_cal && dietaSugerida.seus_alimentos.low_cal.length > 0 && (
                    <div>
                      <h4 style={{fontSize: '0.8125rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem'}}>🥬 Baixa Caloria</h4>
                      <div style={{display: 'grid', gridTemplateColumns: window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr', gap: '0.5rem'}}>
                        {dietaSugerida.seus_alimentos.low_cal.map((al, idx) => (
                          <div key={idx} style={{background: '#1a1a1a', borderRadius: '0.5rem', padding: '0.625rem', border: '1px solid #2a2a2a'}}>
                            <div style={{fontSize: '0.875rem', fontWeight: '500', color: '#fff'}}>{al.nome}</div>
                            <div style={{fontSize: '0.75rem', color: '#9ca3af'}}>{al.calorias} kcal</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div style={{background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '0.75rem', padding: '0.875rem'}}>
              <div style={{display: 'flex', gap: '0.75rem'}}>
                <span style={{fontSize: '1.25rem'}}>⚠️</span>
                <div>
                  <h3 style={{fontWeight: '600', color: '#fbbf24', marginBottom: '0.25rem', fontSize: '0.875rem'}}>Atenção</h3>
                  <p style={{fontSize: '0.75rem', color: '#9ca3af', margin: 0}}>
                    Sugestão baseada no IMC. Consulte um nutricionista.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{marginTop: '2rem', textAlign: 'center'}}>
        <a
          href="/dietas"
          style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', background: '#1a1a1a', color: '#ff8c42', borderRadius: '0.75rem', border: '1px solid rgba(255, 140, 66, 0.3)', fontWeight: '600', textDecoration: 'none', fontSize: '0.875rem'}}
        >
          📚 Ver Todas as Dietas
        </a>
      </div>
    </main>
  );
}