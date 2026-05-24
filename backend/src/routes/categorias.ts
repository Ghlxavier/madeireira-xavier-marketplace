import { Router } from 'express';

export const categoriasRouter = Router();

// GET /api/categorias
categoriasRouter.get('/', (_req, res) => {
  // TODO: listar categorias
  res.status(501).json({ message: 'Não implementado ainda' });
});

// GET /api/categorias/:id
categoriasRouter.get('/:id', (_req, res) => {
  res.status(501).json({ message: 'Não implementado ainda' });
});

// POST /api/categorias
categoriasRouter.post('/', (_req, res) => {
  // TODO: criar categoria
  res.status(501).json({ message: 'Não implementado ainda' });
});

// PUT /api/categorias/:id
categoriasRouter.put('/:id', (_req, res) => {
  res.status(501).json({ message: 'Não implementado ainda' });
});

// DELETE /api/categorias/:id
categoriasRouter.delete('/:id', (_req, res) => {
  res.status(501).json({ message: 'Não implementado ainda' });
});
