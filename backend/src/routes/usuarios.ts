import { Router } from 'express';

export const usuariosRouter = Router();

// GET /api/usuarios
usuariosRouter.get('/', (_req, res) => {
  // TODO: listar usuários
  res.status(501).json({ message: 'Não implementado ainda' });
});

// GET /api/usuarios/:id
usuariosRouter.get('/:id', (req, res) => {
  // TODO: buscar por ID
  res.status(501).json({ id: req.params.id, message: 'Não implementado ainda' });
});

// PUT /api/usuarios/:id
usuariosRouter.put('/:id', (_req, res) => {
  // TODO: atualizar usuário
  res.status(501).json({ message: 'Não implementado ainda' });
});

// DELETE /api/usuarios/:id
usuariosRouter.delete('/:id', (_req, res) => {
  // TODO: remover usuário
  res.status(501).json({ message: 'Não implementado ainda' });
});
