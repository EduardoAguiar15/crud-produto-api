const CategoriaModel = require("../models/CategoriaModel");
const { where } = require('sequelize');
const {NaoEncontradoError, AplicacaoError} = require ("../errors/typeError.js")

async function obterTodos() {
  return await CategoriaModel.findAll();
}

async function obterPorId(id) {
  const categoria = await CategoriaModel.findByPk(id);

   if (!categoria) {
    throw new NaoEncontradoError(404,'Não foi possível encontrar a categoria com id ' + id);
  }

  return categoria;
}

async function cadastrar(obj) {
  const categoria = await CategoriaModel.create(obj);

  if (!categoria) {
    throw new AplicacaoError (500, 'Não foi possível cadastrar a categoria.');
  }

  return categoria;
}

async function atualizar(id, obj) {
  await obterPorId(id);

  const atualizado = await CategoriaModel.update(obj, { where: { id } });

  if (!atualizado) {
    throw new AplicacaoError (500, 'Não foi possível atualizar a categoria.');
  }

  return obj;
}

async function deletar(id) {
  await obterPorId(id);
  const categoria = await CategoriaModel.destroy({ where: { id } });

  if (!categoria) {
    throw new  AplicacaoError (500, 'Não foi possível deletar a categoria.');
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