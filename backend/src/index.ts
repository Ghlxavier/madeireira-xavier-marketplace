import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// TODO: importar e conectar as rotas aqui
// app.use('/api/auth',       authRouter);
// app.use('/api/usuarios',   usuariosRouter);
// app.use('/api/categorias', categoriasRouter);
// app.use('/api/servicos',   servicosRouter);
// app.use('/api/pedidos',    pedidosRouter);
// app.use('/api/avaliacoes', avaliacoesRouter);
// app.use('/api/mensagens',  mensagensRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`TaskPro API rodando em http://localhost:${PORT}`);
});
