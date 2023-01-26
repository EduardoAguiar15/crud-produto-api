const produtoService = require("../services/ProdutoService");
const { ModeloInvalidoError } = require("../errors/typeError");
const ProdutoDTO = require("../dtos/ProdutoDTO");

class ProdutoController {
  async obterPorTodos(req, res) {
    try {
      const produtos = await produtoService.obterTodos();

      return res.json(produtos);
    } catch (error) {
      console.error(error);
      return res.status(error.status).json(error);
    }
  }
  async obterPorId(req, res) {
    const { id } = req.params;
    try {
      if (!id || isNaN(id)) {
        throw new ModeloInvalidoError (400, 'Id invalido para consulta de produto.');
      }
      const produto = await produtoService.obterPorId(id);

      return res.json(produto);
    } catch (error) {
      console.error(error);
      return res.status(error.status).json(error);
    }
  }
  async cadastrar(req, res) {
    try {
      const produtoDTO = new ProdutoDTO(req.body);
      produtoDTO.modeloValidoCadastro();
      const produto = await produtoService.cadastrar(produtoDTO);

      return res.json(produto);
    } catch (error) {
      console.error(error);
      return res.status(error.status).json(error);
    }
  }
  async atualizar(req, res) {
    const { id } = req.params;
    try {
      if(!id || isNaN(id)) {
        throw new ModeloInvalidoError(400, 'Id invalido para consulta de produto.');
      }
      const produtoDTO = new ProdutoDTO({id, ... req.body});
      produtoDTO.modeloValidoCadastro();
      
      const produto = await produtoService.atualizar(id, req.body);
      return res.json(produto);
    } catch (error) {
      console.error(error);
      return res.status(error.status).json(error);
    }
  }
  async deletar(req, res) {
    const { id } = req.params;
    try {
      if (!id || isNaN(id)) {
        throw new ModeloInvalidoError(400,'Id invalido para consulta de produto.');
      }
      return res.send(await produtoService.deletar(id));
    } catch(error) {
      console.error(error);
      return res.status(error.status).json(error);
    }
  }
}

module.exports = ProdutoController;