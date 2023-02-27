const express = require('express');
// Trabalha com as rotas
const routes = express.Router();

const usuarioService = require('./src/services/UsuarioService');


//Esse cara é um interceptor, ele intercepta todas as requisições e aqui podemos tomar ação especifica.
routes.use( async (req, res, next) => {
    const { authorization } = req.headers;
    const  autenticado = await usuarioService.validarAutenticacao(authorization);

    // if(!autenticado && req.originalUrl !== '/login') {
    //     return res.status (401).json({
    //     status:401,
    //     message: 'usuario não autenticado',
    //     name: 'Nao Autorizado'
    //     });
    // }
next();

});

const ProdutoController = require("./src/controllers/ProdutoController");
const produtoController = new ProdutoController();

// Rotas de produtos - Definindo endpoints
routes.get("/produtos", produtoController.obterTodos);
routes.get("/produtos/:id", produtoController.obterPorId);
routes.post("/produtos", produtoController.cadastrar);
routes.put("/produtos/:id", produtoController.atualizar);
routes.delete("/produtos/:id", produtoController.deletar);

const CategoriaController = require("./src/controllers/CategoriaController");
const categoriaController = new CategoriaController();

// Rotas de categorias - Definindo endpoints
routes.get("/categorias", categoriaController.obterTodos);
routes.get("/categorias/:id", categoriaController.obterPorId);
routes.post("/categorias", categoriaController.cadastrar);
routes.put("/categorias/:id", categoriaController.atualizar);
routes.delete("/categorias/:id", categoriaController.deletar);

const UsuarioController = require("./src/controllers/UsuarioController");
const usuarioController = new UsuarioController();

// Rotas de Usuarios - Definindo endpoints
routes.get("/usuarios", usuarioController.obterTodos);

routes.get("/usuarios/:id", usuarioController.obterPorId);

routes.post("/usuarios", usuarioController.cadastrar);

routes.put("/usuarios/:id", usuarioController.atualizar);


//rotas de login - Definindo
routes.post("/login", usuarioController.login);

routes.delete("/logout", usuarioController.logout);


module.exports = routes;