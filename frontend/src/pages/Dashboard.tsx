import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { pedidosApi } from '../api/client';
import type { Pedido } from '../types';

const STATUS_LABELS: Record<string, string> = {
  PENDENTE:     'Pendente',
  ACEITO:       'Aceito',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDO:    'Concluído',
  CANCELADO:    'Cancelado',
};

function statusClass(s: string) {
  return `status-badge status-badge--${s.toLowerCase().replace('_', '')}`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const userRaw = localStorage.getItem('taskpro_user');
  const user    = userRaw ? JSON.parse(userRaw) : null;

  const [pedidos, setPedidos]   = useState<Pedido[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }

    const param = user.tipo === 'MARCENEIRO'
      ? { marceneiro_id: user.id }
      : { cliente_id: user.id };

    pedidosApi.listar(param)
      .then(setPedidos)
      .catch(() => setPedidos([]))
      .finally(() => setLoading(false));
  }, []);

  if (!user) return null;

  const total    = pedidos.length;
  const concluidos  = pedidos.filter(p => p.status === 'CONCLUIDO').length;
  const andamento   = pedidos.filter(p => p.status === 'EM_ANDAMENTO').length;
  const pendentes   = pedidos.filter(p => p.status === 'PENDENTE').length;

  return (
    <main className="dashboard">
      <div className="dashboard__inner">
        <h1 className="dashboard__greeting">
          Olá, {user.nome.split(' ')[0]}! 👋
        </h1>
        <p className="dashboard__role">
          {user.tipo === 'MARCENEIRO' ? 'Painel do Marceneiro' : 'Painel do Cliente'} •{' '}
          {user.cidade ?? 'Brasil'}
        </p>

        {/* Estatísticas */}
        <div className="dash-stats">
          <div className="stat-card">
            <div className="stat-card__label">Total de Pedidos</div>
            <div className="stat-card__value">{total}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__label">Em Andamento</div>
            <div className="stat-card__value">{andamento}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__label">Concluídos</div>
            <div className="stat-card__value">{concluidos}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__label">Aguardando</div>
            <div className="stat-card__value">{pendentes}</div>
          </div>
        </div>

        {/* Lista de pedidos */}
        <h2 className="dash-section-title">
          {user.tipo === 'MARCENEIRO' ? 'Pedidos Recebidos' : 'Meus Pedidos'}
        </h2>

        {loading ? (
          <div className="loading">
            <div className="spinner" /> Carregando pedidos...
          </div>
        ) : pedidos.length === 0 ? (
          <div style={{
            background: 'var(--bg-alt)', borderRadius: 'var(--radius-lg)',
            padding: '48px', textAlign: 'center', color: 'var(--text-muted)',
          }}>
            <p style={{ fontSize: 15, marginBottom: 16 }}>
              Nenhum pedido encontrado ainda.
            </p>
            {user.tipo === 'CLIENTE' && (
              <Link to="/marceneiros" className="btn-primary">
                Encontrar Marceneiro
              </Link>
            )}
          </div>
        ) : (
          <div className="orders-list">
            {pedidos.map(p => (
              <div className="order-card" key={p.id}>
                <div style={{ flex: 1 }}>
                  <div className="order-card__title">{p.servico_titulo}</div>
                  <div className="order-card__meta">
                    {user.tipo === 'MARCENEIRO'
                      ? `Cliente: ${p.cliente_nome}`
                      : `Marceneiro: ${p.marceneiro_nome}`
                    }
                    {p.data_agendada && ` • ${new Date(p.data_agendada).toLocaleDateString('pt-BR')}`}
                  </div>

                  {p.status === 'EM_ANDAMENTO' && (
                    <div className="progress-wrap" style={{ marginTop: 8, maxWidth: 300 }}>
                      <div className="progress-bar">
                        <div
                          className="progress-bar__fill"
                          style={{ width: `${p.progresso}%` }}
                        />
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>
                        {p.progresso}% concluído
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div className="order-card__value">
                    R$ {p.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <span className={statusClass(p.status)}>
                      {STATUS_LABELS[p.status]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ações rápidas */}
        <div style={{ marginTop: 48, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/marceneiros" className="btn-primary">
            {user.tipo === 'MARCENEIRO' ? 'Ver Meu Perfil Público' : 'Buscar Marceneiro'}
          </Link>
          <Link to="/" className="btn-ghost">Voltar ao Início</Link>
        </div>
      </div>
    </main>
  );
}
