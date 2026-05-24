import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usuariosApi, servicosApi, avaliacoesApi } from '../api/client';
import type { Usuario, Servico, Avaliacao } from '../types';

const AVATARES = [
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=600&h=400&fit=crop',
];

export default function MarceneiroDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [marc, setMarc]       = useState<Usuario | null>(null);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [avs, setAvs]         = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const idx = Number(id) % AVATARES.length;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      usuariosApi.buscar(Number(id)),
      servicosApi.listar({ marceneiro_id: id }),
      avaliacoesApi.listar({ marceneiro_id: id }),
    ]).then(([u, s, a]) => {
      setMarc(u);
      setServicos(s);
      setAvs(a);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  function handleContatar() {
    const user = localStorage.getItem('taskpro_user');
    if (!user) { navigate('/login'); return; }
    alert('Em breve: envio de mensagem direto para o marceneiro!');
  }

  if (loading) return <div className="loading"><div className="spinner" /> Carregando...</div>;
  if (!marc) return <div className="loading">Marceneiro não encontrado.</div>;

  return (
    <main className="page">
      <div className="page__inner">
        <Link to="/marceneiros" style={{ color: 'var(--brown-light)', fontSize: 14, fontWeight: 600 }}>
          ← Voltar para Marceneiros
        </Link>

        {/* Perfil */}
        <div style={{
          display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48,
          marginTop: 32, alignItems: 'start',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 200, height: 200, borderRadius: '50%',
              overflow: 'hidden', margin: '0 auto 16px', background: '#d4c4bc',
            }}>
              <img src={AVATARES[idx]} alt={marc.nome}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {marc.destaque ? (
              <span className="pro-card__badge" style={{ display: 'inline-block', marginBottom: 12 }}>
                Destaque
              </span>
            ) : null}
            <div className="pro-card__rating" style={{ justifyContent: 'center', marginBottom: 8, fontSize: 15 }}>
              ⭐ {marc.avaliacao_media.toFixed(1)}
              <span style={{ color: 'var(--text-faint)', fontSize: 12, marginLeft: 4 }}>
                ({marc.total_avaliacoes})
              </span>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 4 }}>
              📍 {marc.cidade}, {marc.estado}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
              🔨 {marc.total_projetos} projetos realizados
            </div>
            <button className="btn-primary" style={{ width: '100%' }} onClick={handleContatar}>
              Entrar em contato
            </button>
          </div>

          <div>
            <h1 className="page__title" style={{ marginBottom: 4 }}>{marc.nome}</h1>
            <p className="page__subtitle" style={{ marginBottom: 24 }}>
              Marceneiro Profissional
            </p>
            {marc.bio && (
              <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: 40 }}>
                {marc.bio}
              </p>
            )}

            {/* Serviços */}
            {servicos.length > 0 && (
              <>
                <h2 className="dash-section-title">Serviços Oferecidos</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 40 }}>
                  {servicos.map(s => (
                    <div key={s.id} className="order-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                      <div className="order-card__title">{s.titulo}</div>
                      <div className="order-card__meta">{s.categoria_nome} • {s.tempo_estimado}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span className="order-card__value">
                          R$ {s.preco_base.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>
                          ⭐ {s.avaliacao_media.toFixed(1)} ({s.total_avaliacoes})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Avaliações */}
            {avs.length > 0 && (
              <>
                <h2 className="dash-section-title">Avaliações dos Clientes</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {avs.map(a => (
                    <div key={a.id} style={{
                      background: 'var(--bg-alt)', borderRadius: 'var(--radius-lg)',
                      padding: '20px 24px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-dark)' }}>
                          {a.cliente_nome}
                        </span>
                        <span style={{ color: '#fbbf24' }}>
                          {'★'.repeat(a.nota)}{'☆'.repeat(5 - a.nota)}
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 'auto' }}>
                          {new Date(a.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      {a.comentario && (
                        <p style={{ fontSize: 14, color: 'var(--text-mid)', fontStyle: 'italic' }}>
                          {a.comentario}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
