const categoriaService = require("../services/CategoriaService");
const CategoriaDTO = require("../dtos/CategoriaDTO");
const { ModeloInvalidoError } = require("../errors/typeError");

class CategoriaController {
  async obterTodos(req, res) {
    try {
      const produtos = await categoriaService.obterTodos();

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
        throw new ModeloInvalidoError(400, 'Id inválido para consulta de categoria.')
      }
      const produto = await categoriaService.obterPorId(id);

      return res.json(produto);
    } catch (error) {
      console.error(error);
      return res.status(error.status).json(error);
    }
  }
  async cadastrar(req, res) {
    try {
      const categoriaDTO = new CategoriaDTO(req.body);
      categoriaDTO.modeloValidoCadastro();
      const categoria = await categoriaService.cadastrar(categoriaDTO);

      return res.json(categoria);
    } catch (error) {
      console.error(error);
      return res.status(error.status).json(error);
    }
  }
  async atualizar(req, res) {
    const { id } = req.params;
    try {
      if (!id || isNaN(id)) {
        throw new ModeloInvalidoError(400, 'Id inválido para consulta de categoria.')
      }

      const categoriaDTO = new CategoriaDTO({ id, ...req.body });
      categoriaDTO.modeloValidoCadastro();

      const produto = await categoriaService.atualizar(id, req.body);

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
        throw new ModeloInvalidoError(400, 'Id inválido para consulta de categoria.')
      }
      return res.send(await categoriaService.deletar(id));
    } catch (error) {
      console.error(error);
      return res.status(error.status).json(error);
    }
  }
}

module.exports = CategoriaController;