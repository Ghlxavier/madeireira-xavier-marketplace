import { Router } from 'express';

export const servicosRouter = Router();

// GET /api/servicos
servicosRouter.get('/', (_req, res) => {
  // TODO: listar serviços (filtros: categoria_id, marceneiro_id, status)
  res.status(501).json({ message: 'Não implementado ainda' });
});

// GET /api/servicos/:id
servicosRouter.get('/:id', (_req, res) => {
  res.status(501).json({ message: 'Não implementado ainda' });
});

// POST /api/servicos
servicosRouter.post('/', (_req, res) => {
  // TODO: criar serviço
  res.status(501).json({ message: 'Não implementado ainda' });
});

// PUT /api/servicos/:id
servicosRouter.put('/:id', (_req, res) => {
  res.status(501).json({ message: 'Não implementado ainda' });
});

// DELETE /api/servicos/:id
servicosRouter.delete('/:id', (_req, res) => {
  res.status(501).json({ message: 'Não implementado ainda' });
});
