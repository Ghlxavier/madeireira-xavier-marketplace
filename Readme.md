# TaskPro – Marketplace de Marcenaria

Plataforma que conecta clientes a marceneiros qualificados.  
Design de referência: [Figma TaskPro](https://www.figma.com/proto/GUBy59AIS2qAzB5QQqfCC7/TaskPro)

---

## Estrutura do Projeto

```
taskpro/
├── frontend/   → React + TypeScript + Vite  (PRONTO)
└── backend/    → Express + TypeScript + SQLite  (ESTRUTURA PRONTA – implementar)
```

---

## Como rodar

### Frontend
```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

### Backend
```bash
cd backend
npm install
npm run dev        # http://localhost:3001
```

---

## ✅ Checklist do Projeto

### Frontend (feito)
- [x] Header com logo TaskPro, navegação e botões de ação
- [x] Página Home — hero, busca, categorias, como funciona, profissionais em destaque, CTA
- [x] Página Marceneiros — listagem com filtro por categoria
- [x] Página Detalhe do Marceneiro — perfil, serviços e avaliações
- [x] Página Login — autenticação com feedback de erro
- [x] Página Cadastro — cliente ou marceneiro
- [x] Página Dashboard — estatísticas e listagem de pedidos do usuário logado
- [x] Footer com links e redes sociais
- [x] Design fiel ao Figma (cores, tipografia Manrope + Inter, layout)
- [x] Responsivo (mobile, tablet, desktop)
- [x] Cliente Axios configurado com proxy para `/api`
- [x] Tipagens TypeScript para todas as entidades

### Backend (estrutura pronta – implementar)
- [x] Projeto Express + TypeScript configurado
- [x] Schema das 6 tabelas definido em `src/initDB.ts`
- [x] Arquivos de rota criados para cada entidade
- [ ] Conexão com SQLite (`src/db.ts`)
- [ ] Criação das tabelas (`src/initDB.ts`)
- [ ] Rota `POST /api/auth/login`
- [ ] Rota `POST /api/auth/register`
- [ ] CRUD `/api/usuarios`
- [ ] CRUD `/api/categorias`
- [ ] CRUD `/api/servicos`
- [ ] CRUD `/api/pedidos` + PATCH status
- [ ] CRUD `/api/avaliacoes` (recalcular média do marceneiro ao criar)
- [ ] CRUD `/api/mensagens` + PATCH lida
- [ ] Seed de dados para testes (`src/seed.ts`)

---

## 🗄️ Entidades do Banco de Dados

| Tabela        | Descrição                                              |
|---------------|--------------------------------------------------------|
| `usuarios`    | Clientes e marceneiros (campo `tipo`)                  |
| `categorias`  | Ambientes: Cozinha, Quarto, Sala, Gourmet, Escritório… |
| `servicos`    | Serviços oferecidos pelos marceneiros                  |
| `pedidos`     | Contratações feitas pelos clientes                     |
| `avaliacoes`  | Notas (1–5) e comentários de pedidos concluídos        |
| `mensagens`   | Chat entre cliente e marceneiro por pedido             |

---

## 💡 Sugestões de Implementação do Backend

### 1. Configure a conexão com o banco (`src/db.ts`)
```bash
npm install better-sqlite3 @types/better-sqlite3
```
Descomente o código em `src/db.ts` para criar e exportar a instância do SQLite.

### 2. Crie as tabelas (`src/initDB.ts`)
Descomente o `sqlite.exec(...)` com o schema completo.  
Chame `initDB()` no topo de `src/index.ts`, antes do `app.listen()`.

### 3. Implemente as rotas em ordem sugerida
```
1. categorias  →  mais simples, sem FK
2. auth        →  register + login básico (sem JWT por enquanto)
3. usuarios    →  GET/PUT/DELETE
4. servicos    →  JOIN com usuarios e categorias
5. pedidos     →  JOIN com servicos e usuarios; PATCH /status
6. avaliacoes  →  recalcular avaliacao_media do marceneiro ao inserir
7. mensagens   →  filtrar por pedido_id ou par de usuários
```

### 4. Padrão de rota sugerido (exemplo: categorias)
```typescript
import { Router } from 'express';
import { sqlite } from '../db.js';

export const categoriasRouter = Router();

categoriasRouter.get('/', (_req, res) => {
  const categorias = sqlite.prepare('SELECT * FROM categorias').all();
  res.json(categorias);
});

categoriasRouter.post('/', (req, res) => {
  const { nome, descricao, icone } = req.body;
  const r = sqlite.prepare(
    'INSERT INTO categorias (nome, descricao, icone) VALUES (?, ?, ?)'
  ).run(nome, descricao, icone);
  res.status(201).json(sqlite.prepare('SELECT * FROM categorias WHERE id = ?').get(r.lastInsertRowid));
});
```

### 5. Conecte o `index.ts` às rotas
Descomente os `app.use(...)` que já estão comentados no `src/index.ts`.

### 6. Dados de teste (`src/seed.ts`)
Implemente o seed e execute com:
```bash
npm run seed
```
Sugestão de logins de teste:
- Marceneiro: `roberto@taskpro.com` / `123456`
- Cliente: `mariana@email.com` / `123456`

---

## 🎨 Guia de Design (Frontend)

| Token              | Valor       |
|--------------------|-------------|
| Cor primária       | `#422b22`   |
| Cor de fundo       | `#f9f9f6`   |
| Fundo alternativo  | `#f4f4f1`   |
| Acento (badge)     | `#ffdbce`   |
| Logo "Task"        | `#965834`   |
| Logo "Pro"         | `#a7b767`   |
| Fonte títulos      | Manrope 800 |
| Fonte corpo        | Inter 400   |

---

## 🔗 Endpoints da API

| Método | Rota                        | Descrição                      |
|--------|-----------------------------|--------------------------------|
| POST   | `/api/auth/login`           | Login                          |
| POST   | `/api/auth/register`        | Cadastro                       |
| GET    | `/api/usuarios`             | Listar usuários (filtros: tipo)|
| GET    | `/api/usuarios/:id`         | Buscar usuário                 |
| GET    | `/api/categorias`           | Listar categorias              |
| GET    | `/api/servicos`             | Listar serviços (filtros)      |
| GET    | `/api/servicos/:id`         | Detalhe do serviço             |
| POST   | `/api/servicos`             | Criar serviço                  |
| GET    | `/api/pedidos`              | Listar pedidos (filtros)       |
| POST   | `/api/pedidos`              | Criar pedido                   |
| PATCH  | `/api/pedidos/:id/status`   | Atualizar status + progresso   |
| GET    | `/api/avaliacoes`           | Listar avaliações              |
| POST   | `/api/avaliacoes`           | Criar avaliação                |
| GET    | `/api/mensagens`            | Listar mensagens               |
| POST   | `/api/mensagens`            | Enviar mensagem                |
| PATCH  | `/api/mensagens/:id/lida`   | Marcar como lida               |
