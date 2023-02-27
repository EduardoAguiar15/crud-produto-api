const usuarioService = require('../services/UsuarioService');
const { NaoAutorizadoError, ModeloInvalidoError } = require("../errors/typeError");

const  UsuarioDTO = require("../dtos/UsuarioDTO")

class UsuarioController {
    async login(req, res) {
        const { email, senha } = req.body;

        try {
            if (!email || !senha) {
                throw new NaoAutorizadoError(401, "Usuário ou senha invalidas.")
            }

            const credencial = await usuarioService.validarUsuario(email, senha);
            return res.json(credencial);
        } catch (error) {
            console.error(error);
            return res.status(error.status).json(error);
        }
    }

    async logout(req, res) {
        try {
            await usuarioService.logout(req.headers.authorization);
            return res.status(204).json();
        } catch (error) {
            console.error(error);
            return res.status(error.status).json(error);
        }
    }
    async obterTodos (req, res) {
        try {
            const usuarios = await usuarioService.obterTodos();
            return res.json(usuarios);
        } catch (error) {
            console.error(error);
            return res.status(error.status).json(error);
        }
    }

    async obterPorId(req, res) {
      const { id } = req.params;
      
        try {
         if(!id || isNaN(id)){
            throw new ModeloInvalidoError(400,"id invalido para consulta de usuario.")
        } 
        const usuario = await usuarioService.obterPorId(id);
        return res.json(usuario);
    }
        catch (error) {
            console.error(error);
            return res.status(error.status).json(error);
        }
    }
    async atualizar(req, res) {
        const { id } = req.params;
        
          try {
           if(!id || isNaN(id)){
              throw new ModeloInvalidoError(400,"id invalido para consulta de usuario.")
          } 
          const usuarioDTO = new UsuarioDTO({ id, ...req.body});
          usuarioDTO.modeloValidoatualizacao();

          const usuario = await usuarioService.atualizar(usuarioDTO);
          return res.json(usuario);
      }
          catch (error) {
              console.error(error);
              return res.status(error.status).json(error);
          }
      }
  

    async cadastrar (req, res) {
        try {
            const usuarioDTO = new UsuarioDTO(req.body);
            usuarioDTO.modeloValidoCadastro();

            const usuario = await usuarioService.cadastrar(usuarioDTO);
            return res.json(usuario);
        } catch (error) {
            console.error(error);
            return res.status(error.status).json(error);
        }
    }
}
module.exports = UsuarioController;