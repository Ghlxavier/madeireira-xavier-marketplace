import { Router } from 'express';

export const authRouter = Router();

// POST /api/auth/login
authRouter.post('/login', (_req, res) => {
  // TODO: implementar autenticação
  res.status(501).json({ message: 'Não implementado ainda' });
});

// POST /api/auth/register
authRouter.post('/register', (_req, res) => {
  // TODO: implementar cadastro
  res.status(501).json({ message: 'Não implementado ainda' });
});
