import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categoriasApi, usuariosApi } from '../api/client';
import type { Categoria, Usuario } from '../types';

const AVATARES = [
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop',
];

const HERO_IMG =
  'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=900&h=700&fit=crop';

const HIW_IMGS = [
  'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1581289123327-0fc506a9ce9a?w=500&h=400&fit=crop',
];

export default function Home() {
  const [categorias, setCategorias]   = useState<Categoria[]>([]);
  const [destaques, setDestaques]     = useState<Usuario[]>([]);
  const [search, setSearch]           = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    categoriasApi.listar().then(setCategorias).catch(() => {});
    usuariosApi.listar({ tipo: 'MARCENEIRO', destaque: 'true' })
      .then((data: Usuario[]) => setDestaques(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/marceneiros?q=${encodeURIComponent(search)}`);
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__inner">
          <div>
            <h1 className="hero__title">
              O que você quer{' '}
              <span style={{ color: 'var(--brown-light)' }}>Concertar</span>{' '}
              ou{' '}
              <span className="highlight">construir</span>{' '}
              hoje?
            </h1>

            <form onSubmit={handleSearch}>
              <div className="hero__search">
                <span className="hero__search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Ex: Armário de cozinha sob medida, reparo de porta..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button type="submit" className="btn-primary">Buscar</button>
              </div>
            </form>

            <div className="hero__tags">
              <span className="hero__tags-label">Populares:</span>
              {['Roupeiros', 'Painel TV', 'Restauração'].map(t => (
                <span key={t} className="hero__tag"
                  onClick={() => navigate(`/marceneiros?q=${t}`)}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="hero__image-wrap">
              <img src={HERO_IMG} alt="Marceneiro trabalhando" />
            </div>
            <div className="hero__review-card">
              <div className="hero__stars">{'★★★★★'}</div>
              <p className="hero__review-text">
                "O projeto do meu escritório superou todas as expectativas.
                Acabamento impecável."
              </p>
              <span className="hero__review-author">— Mariana Silva, SP</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIAS ── */}
      <section className="section section--alt" id="categorias">
        <div className="section__inner">
          <div className="section__head">
            <div>
              <h2 className="section__title">Explore por Ambientes</h2>
              <p className="section__subtitle">
                Soluções planejadas por especialistas para cada m² da sua casa
                ou escritório.
              </p>
            </div>
            <Link to="/marceneiros" className="section__link">
              Ver todas categorias →
            </Link>
          </div>

          <div className="cat-grid">
            {categorias.length > 0
              ? categorias.slice(0, 5).map(c => (
                  <Link to={`/marceneiros?categoria=${c.id}`} key={c.id}
                    className="cat-card" style={{ textDecoration: 'none' }}>
                    <div className="cat-card__icon">{c.icone ?? '🪵'}</div>
                    <div className="cat-card__name">{c.nome}</div>
                  </Link>
                ))
              : ['Cozinha', 'Quarto', 'Sala de Estar', 'Área Gourmet', 'Escritório'].map(n => (
                  <div key={n} className="cat-card">
                    <div className="cat-card__icon">🪵</div>
                    <div className="cat-card__name">{n}</div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="section" id="como-funciona">
        <div className="section__inner">
          <div className="hiw">
            <div>
              <h2 className="hiw__title">
                Tradição artesanal encontra a agilidade digital.
              </h2>
              <div className="hiw__steps">
                {[
                  { n: '01', title: 'Solicite seu Orçamento',
                    desc: 'Descreva seu projeto ou conserto. É rápido e gratuito.' },
                  { n: '02', title: 'Receba Propostas',
                    desc: 'Marceneiros qualificados enviarão orçamentos detalhados em até 24h.' },
                  { n: '03', title: 'Feche com Segurança',
                    desc: 'Avalie o portfólio, escolha o profissional e inicie seu projeto com garantia.' },
                ].map(s => (
                  <div className="hiw__step" key={s.n}>
                    <div className="hiw__num">{s.n}</div>
                    <div>
                      <div className="hiw__step-title">{s.title}</div>
                      <div className="hiw__step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hiw__images">
              {HIW_IMGS.map((src, i) => (
                <div className="hiw__img" key={i}>
                  <img src={src} alt="" />
                </div>
              ))}
              <div className="hiw__tracker">
                <div className="hiw__tracker-label">
                  <span className="hiw__tracker-dot" />
                  Status do Projeto
                </div>
                <div className="hiw__tracker-name">Rack para Sala</div>
                <div className="hiw__progress-bar">
                  <div className="hiw__progress-fill" style={{ width: '65%' }} />
                </div>
                <div className="hiw__progress-info">
                  <span>Corte de Peças</span>
                  <span>65%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROFISSIONAIS DESTAQUE ── */}
      <section className="section section--white">
        <div className="section__inner">
          <div className="section__head section__head--center">
            <h2 className="section__title" style={{ fontSize: 36 }}>
              Mestres da Madeira
            </h2>
            <p className="section__subtitle" style={{ textAlign: 'center' }}>
              Profissionais verificados com as melhores avaliações da nossa
              comunidade.
            </p>
          </div>

          <div className="pro-grid" style={{ marginTop: 48 }}>
            {destaques.length > 0
              ? destaques.map((m, i) => (
                  <div className="pro-card" key={m.id}>
                    <div className="pro-card__img">
                      <img
                        src={AVATARES[i % AVATARES.length]}
                        alt={m.nome}
                      />
                      {m.destaque ? (
                        <span className="pro-card__badge">Destaque</span>
                      ) : null}
                    </div>
                    <div className="pro-card__info">
                      <div>
                        <div className="pro-card__name">{m.nome}</div>
                        <div className="pro-card__spec">
                          {m.bio?.split('.')[0] ?? 'Marceneiro profissional'}
                        </div>
                      </div>
                      <div className="pro-card__rating">
                        ⭐ {m.avaliacao_media.toFixed(1)}
                      </div>
                    </div>
                    <div className="pro-card__footer">
                      <span className="pro-card__count">
                        {m.total_projetos} Projetos
                      </span>
                      <Link
                        to={`/marceneiros/${m.id}`}
                        className="pro-card__link"
                      >
                        Ver Perfil
                      </Link>
                    </div>
                  </div>
                ))
              : /* skeleton */
                [1, 2, 3].map(n => (
                  <div className="pro-card" key={n}
                    style={{ background: 'var(--bg-alt)', minHeight: 360 }} />
                ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ padding: '48px 32px 96px' }}>
        <div className="section--dark cta">
          <h2 className="cta__title">
            Dê vida ao seu próximo projeto em madeira.
          </h2>
          <div className="cta__actions">
            <Link to="/cadastro" className="btn-cta-white">
              Solicite seu Orçamento Grátis
            </Link>
            <Link to="/marceneiros" className="btn-cta-outline">
              Falar com Consultor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
