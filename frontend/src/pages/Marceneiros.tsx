import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { usuariosApi, categoriasApi } from '../api/client';
import type { Usuario, Categoria } from '../types';

const AVATARES = [
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
];

export default function Marceneiros() {
  const [marceneiros, setMarceneiros] = useState<Usuario[]>([]);
  const [categorias, setCategorias]   = useState<Categoria[]>([]);
  const [loading, setLoading]         = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const catFiltro = searchParams.get('categoria') ?? '';
  const qFiltro   = searchParams.get('q') ?? '';

  useEffect(() => {
    setLoading(true);
    Promise.all([
      usuariosApi.listar({ tipo: 'MARCENEIRO' }),
      categoriasApi.listar(),
    ]).then(([users, cats]) => {
      setMarceneiros(users);
      setCategorias(cats);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtrados = marceneiros.filter(m => {
    if (qFiltro) {
      const q = qFiltro.toLowerCase();
      return (
        m.nome.toLowerCase().includes(q) ||
        m.bio?.toLowerCase().includes(q) ||
        m.cidade?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <main className="page">
      <div className="page__inner">
        <h1 className="page__title">Encontre seu Marceneiro</h1>
        <p className="page__subtitle">
          {filtrados.length} profissionais verificados disponíveis
        </p>

        {/* Filtros de categoria */}
        <div className="filter-bar">
          <button
            className={`filter-btn ${!catFiltro ? 'filter-btn--active' : ''}`}
            onClick={() => { const p = new URLSearchParams(searchParams); p.delete('categoria'); setSearchParams(p); }}
          >
            Todos
          </button>
          {categorias.map(c => (
            <button
              key={c.id}
              className={`filter-btn ${catFiltro === String(c.id) ? 'filter-btn--active' : ''}`}
              onClick={() => {
                const p = new URLSearchParams(searchParams);
                p.set('categoria', String(c.id));
                setSearchParams(p);
              }}
            >
              {c.icone} {c.nome}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner" />
            Carregando profissionais...
          </div>
        ) : (
          <div className="marc-grid">
            {filtrados.map((m, i) => (
              <div className="pro-card" key={m.id}>
                <div className="pro-card__img">
                  <img src={AVATARES[i % AVATARES.length]} alt={m.nome} />
                  {m.destaque ? (
                    <span className="pro-card__badge">Destaque</span>
                  ) : null}
                </div>
                <div className="pro-card__info">
                  <div>
                    <div className="pro-card__name">{m.nome}</div>
                    <div className="pro-card__spec">
                      {m.cidade}, {m.estado}
                    </div>
                  </div>
                  <div className="pro-card__rating">
                    ⭐ {m.avaliacao_media.toFixed(1)}
                  </div>
                </div>
                {m.bio && (
                  <p style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.5 }}>
                    {m.bio.slice(0, 100)}…
                  </p>
                )}
                <div className="pro-card__footer">
                  <span className="pro-card__count">
                    {m.total_projetos} Projetos
                  </span>
                  <Link to={`/marceneiros/${m.id}`} className="pro-card__link">
                    Ver Perfil
                  </Link>
                </div>
              </div>
            ))}
            {filtrados.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                Nenhum marceneiro encontrado para esse filtro.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
