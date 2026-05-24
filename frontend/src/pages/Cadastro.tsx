import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authApi } from '../api/client';

export default function Cadastro() {
  const navigate = useNavigate();
  const [params]  = useSearchParams();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: params.get('tipo') ?? 'CLIENTE',
    telefone: '',
    cidade: '',
    estado: '',
  });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  function set(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await authApi.cadastro(form);
      localStorage.setItem('taskpro_user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })
        ?.response?.data?.error;
      setError(msg ?? 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 520 }}>
        <Link to="/" className="logo" style={{ display: 'inline-block', marginBottom: 24 }}>
          <span>Task</span><span>Pro</span>
        </Link>
        <h1 className="auth-card__title">Crie sua conta</h1>
        <p className="auth-card__subtitle">
          Junte-se à maior rede de marcenaria do Brasil
        </p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Tipo de conta</label>
            <select
              className="form-select"
              value={form.tipo}
              onChange={e => set('tipo', e.target.value)}
            >
              <option value="CLIENTE">Cliente – quero contratar serviços</option>
              <option value="MARCENEIRO">Marceneiro – quero oferecer serviços</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Nome completo</label>
              <input className="form-input" type="text" placeholder="João Silva"
                value={form.nome} onChange={e => set('nome', e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Telefone</label>
              <input className="form-input" type="tel" placeholder="(11) 99999-0000"
                value={form.telefone} onChange={e => set('telefone', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="seu@email.com"
              value={form.email} onChange={e => set('email', e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label">Senha</label>
            <input className="form-input" type="password" placeholder="Mínimo 6 caracteres"
              value={form.senha} onChange={e => set('senha', e.target.value)}
              minLength={6} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Cidade</label>
              <input className="form-input" type="text" placeholder="São Paulo"
                value={form.cidade} onChange={e => set('cidade', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Estado</label>
              <input className="form-input" type="text" placeholder="SP" maxLength={2}
                value={form.estado} onChange={e => set('estado', e.target.value.toUpperCase())} />
            </div>
          </div>

          <button className="btn-full" type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta grátis'}
          </button>
        </form>

        <div className="auth-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </div>
      </div>
    </div>
  );
}
