import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export const authApi = {
  login:   (email: string, senha: string) =>
    api.post('/auth/login', { email, senha }).then(r => r.data),
  cadastro: (data: object) =>
    api.post('/auth/register', data).then(r => r.data),
};

export const usuariosApi = {
  listar:   (params?: object) => api.get('/usuarios', { params }).then(r => r.data),
  buscar:   (id: number)      => api.get(`/usuarios/${id}`).then(r => r.data),
  atualizar:(id: number, data: object) => api.put(`/usuarios/${id}`, data).then(r => r.data),
};

export const categoriasApi = {
  listar: () => api.get('/categorias').then(r => r.data),
};

export const servicosApi = {
  listar: (params?: object) => api.get('/servicos', { params }).then(r => r.data),
  buscar: (id: number)      => api.get(`/servicos/${id}`).then(r => r.data),
  criar:  (data: object)    => api.post('/servicos', data).then(r => r.data),
};

export const pedidosApi = {
  listar:         (params?: object) => api.get('/pedidos', { params }).then(r => r.data),
  buscar:         (id: number)      => api.get(`/pedidos/${id}`).then(r => r.data),
  criar:          (data: object)    => api.post('/pedidos', data).then(r => r.data),
  atualizarStatus:(id: number, status: string, progresso: number) =>
    api.patch(`/pedidos/${id}/status`, { status, progresso }).then(r => r.data),
};

export const avaliacoesApi = {
  listar: (params?: object) => api.get('/avaliacoes', { params }).then(r => r.data),
  criar:  (data: object)    => api.post('/avaliacoes', data).then(r => r.data),
};

export default api;
