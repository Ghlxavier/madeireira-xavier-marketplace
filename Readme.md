<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Cadastro</title>
    <link rel="stylesheet" href="../css/estilo.css">
</head>
<body>

<header>
    <h1>Cadastro</h1>
    <a href="../index.html">Voltar</a>
</header>

<main>
    <div class="form-container">

       <header>
    <h1>Cadastro</h1>   
</header>
<h1></h1>
        <form>
            <label>Nome</label>
            <input type="text" required>

            <label>Email</label>
            <input type="email" required>

            <label>Senha</label>
            <input type="password" required>

            <button>Cadastrar</button>
        </form>

        <p>Já tem conta? <a href="login.html">Entrar</a></p>

    </div>
</main>

</body>
</html>


📍 Rotas Públicas – /src/pages/publico
/HomePublico
/login LoginPage
/cadastro CadastroPage
/lembrar-senha LembrarSenhaPage
/listar ListarNoticiasPage
/noticia/:id NoticiaIndividualPage
/busca PesquisaPublicaPage
/busca/uf/:sigla Pesquisa por UF
/busca/cidade/:id Pesquisa por Cidade

📍 Rotas do Leitor – /src/pages/leitor
/leitor
HomeLeitor

📍Rotas do Autor – /src/pages/autor
/autor
HomeAutor

📍 Rotas do Editor – /src/pages/editor
/editor
HomeEditor

📍 Rotas do Super Administrador – /src/pages/superadmin 
/superadmin
HomeSuperAdmin

📍 Rota Coringa (404)
RotaPágina*NotFoundPage
