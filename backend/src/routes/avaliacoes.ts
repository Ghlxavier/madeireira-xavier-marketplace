import { Router } from 'express';

export const avaliacoesRouter = Router();

// GET /api/avaliacoes
avaliacoesRouter.get('/', (_req, res) => {
  // TODO: listar avaliações (filtros: marceneiro_id, cliente_id)
  res.status(501).json({ message: 'Não implementado ainda' });
});

// POST /api/avaliacoes
avaliacoesRouter.post('/', (_req, res) => {
  // TODO: criar avaliação (nota 1-5 + comentário) e recalcular média do marceneiro
  res.status(501).json({ message: 'Não implementado ainda' });
});
