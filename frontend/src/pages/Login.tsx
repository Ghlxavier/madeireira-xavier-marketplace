import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/client';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail]   = useState('');
  const [senha, setSenha]   = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await authApi.login(email, senha);
      localStorage.setItem('taskpro_user', JSON.stringify(user));
      navigate('/dashboard');
    } catch {
      setError('Email ou senha incorretos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="logo" style={{ display: 'inline-block', marginBottom: 24 }}>
          <span>Task</span><span>Pro</span>
        </Link>
        <h1 className="auth-card__title">Bem-vindo de volta</h1>
        <p className="auth-card__subtitle">
          Entre com sua conta para acessar o painel
        </p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Senha</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>
          <button className="btn-full" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="auth-footer">
          Não tem conta?{' '}
          <Link to="/cadastro">Cadastre-se grátis</Link>
        </div>

        <div className="auth-footer" style={{ marginTop: 16, fontSize: 11, color: 'var(--text-faint)' }}>
          Teste: <strong>roberto@taskpro.com</strong> / <strong>123456</strong>
        </div>
      </div>
    </div>
  );
}
