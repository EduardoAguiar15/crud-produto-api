const express = require('express');
// Trabalha com as rotas
const routes = express.Router();

const ProdutoController = require("./src/controllers/ProdutoController");
const produtoController = new ProdutoController();

// Rotas de produtos - Definindo endpoints
routes.get("/produtos", produtoController.obterPorTodos);
routes.get("/produtos/:id", produtoController.obterPorId);
routes.post("/produtos", produtoController.cadastrar);
routes.put("/produtos/:id", produtoController.atualizar);
routes.delete("/produtos/:id", produtoController.deletar);

const CategoriaController = require("./src/controllers/CategoriaController");
const categoriaController = new CategoriaController();

// Rotas de categorias - Definindo endpoints
routes.get("/categorias", categoriaController.obterPorTodos);
routes.get("/categorias/:id", categoriaController.obterPorId);
routes.post("/categorias", categoriaController.cadastrar);
routes.put("/categorias/:id", categoriaController.atualizar);
routes.delete("/categorias/:id", categoriaController.deletar);

module.exports = routes;