import { Router } from 'express';

export const mensagensRouter = Router();

// GET /api/mensagens
mensagensRouter.get('/', (_req, res) => {
  // TODO: listar mensagens (filtros: remetente_id, destinatario_id, pedido_id)
  res.status(501).json({ message: 'Não implementado ainda' });
});

// POST /api/mensagens
mensagensRouter.post('/', (_req, res) => {
  // TODO: enviar mensagem
  res.status(501).json({ message: 'Não implementado ainda' });
});

// PATCH /api/mensagens/:id/lida
mensagensRouter.patch('/:id/lida', (_req, res) => {
  // TODO: marcar mensagem como lida
  res.status(501).json({ message: 'Não implementado ainda' });
});
