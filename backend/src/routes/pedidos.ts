import { Router } from 'express';

export const pedidosRouter = Router();

// GET /api/pedidos
pedidosRouter.get('/', (_req, res) => {
  // TODO: listar pedidos (filtros: cliente_id, marceneiro_id, status)
  res.status(501).json({ message: 'Não implementado ainda' });
});

// GET /api/pedidos/:id
pedidosRouter.get('/:id', (_req, res) => {
  res.status(501).json({ message: 'Não implementado ainda' });
});

// POST /api/pedidos
pedidosRouter.post('/', (_req, res) => {
  // TODO: criar pedido
  res.status(501).json({ message: 'Não implementado ainda' });
});

// PATCH /api/pedidos/:id/status
pedidosRouter.patch('/:id/status', (_req, res) => {
  // TODO: atualizar status do pedido (PENDENTE → ACEITO → EM_ANDAMENTO → CONCLUIDO)
  res.status(501).json({ message: 'Não implementado ainda' });
});

// DELETE /api/pedidos/:id
pedidosRouter.delete('/:id', (_req, res) => {
  res.status(501).json({ message: 'Não implementado ainda' });
});
