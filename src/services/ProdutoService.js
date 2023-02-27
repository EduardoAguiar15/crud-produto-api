const { where } = require('sequelize');
const ProdutoModel = require("../models/ProdutoModel");
const CategoriaModel = require("../models/CategoriaModel");
const { NaoEncontradoError, AplicacaoError } = require("../errors/typeError");

async function obterTodos() {
  return await ProdutoModel.findAll({
    include: {
      model: CategoriaModel,
      attributes: ["descricao"]
    }
  });
}

async function obterPorId(id) {
  const produto = await ProdutoModel.findByPk(id);

  if (!produto) {
    throw new NaoEncontradoError(404, 'Não foi possível encontrar o produto com id ' + id);
  }

  return produto;
}

async function cadastrar(obj) {
  const produto = await ProdutoModel.create(obj);

  if (!produto) {
    throw new AplicacaoError(500, 'Não foi possível cadastrar o produto.');
  }

  return produto;
}

async function atualizar(id, obj) {
  await obterPorId(id);

  const atualizado = await ProdutoModel.update(obj, { where: { id } });

  if (!atualizado) {
    throw new AplicacaoError(500, 'Não foi possível atualizar o produto.');
  }

  return obj;
}

async function deletar(id) {
  await obterPorId(id);
  const produto = await ProdutoModel.destroy({ where: { id } });

  if (!produto) {
    throw new AplicacaoError(500, 'Não foi possível deletar o produto.');
  }

  return id;
}

module.exports = {
  obterTodos,
  obterPorId,
  cadastrar,
  atualizar,
  deletar
}