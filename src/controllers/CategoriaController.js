
const categoriaService = require("../services/CategoriaService");
const { ModeloInvalidoError } = require("../errors/typeError.js");
const CategoriaDTO = require("../dtos/CategoriaDTO");

class CategoriaController {
  async obterPorTodos(req, res) {
    try {
      const categorias = await categoriaService.obterTodos();

      return res.json(categorias);
    } catch (error) {
      console.error(error);
      return res.status(error.status).json(error);
    }
  }
  async obterPorId(req, res) {
    const { id } = req.params;
    try {
      if (!id || isNaN(id)) {
        throw new ModeloInvalidoError(400, 'Id invalido para consulta de categoria.');
      }
      const categoria = await categoriaService.obterPorId(id);

      return res.json(categoria);
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
        throw new ModeloInvalidoError(400, 'Id invalido para consulta de categoria.');
      }

      const categoriaDTO = new CategoriaDTO({id, ... req.body});
      categoriaDTO.modeloValidoCadastro();

      const categoria = await categoriaService.atualizar(id, req.body);

      return res.json(categoria);
    } catch (error) {
      console.error(error);
      return res.status(error.status).json(error);
    }
  }
  async deletar(req, res) {
    const { id } = req.params;
    try {
      if (!id || isNaN(id)) {
        throw new ModeloInvalidoError(400, 'Id invalido para consulta de categoria.');
      }
      return res.send(await categoriaService.deletar(id));
    } catch (error) {
      console.error(error);
      return res.status(error.status).json(error);
    }
  }
}

module.exports = CategoriaController;