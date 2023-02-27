const UsuarioModel = require("../models/UsuarioModel");
const { NaoAutorizadoError, ModeloInvalidoError, AplicacaoError, NaoEncontradoError } = require("../errors/typeError");

const geradorToken = require("../utils/GeradorToken");
const usuarioCache = require("../cache/UsuarioCache");
const { where } = require("sequelize");

async function validarUsuario(email, senha) {
  email = email.toString().toLowerCase();

  const usuario = await UsuarioModel.findOne({ where: { email } });

  senha = geradorToken.gerarHashDaSenha(senha);

  if (!usuario || (usuario.senha !== senha)) {
    throw new NaoAutorizadoError(401, "Usuário ou senha inválidos.");
  }

  return _criarCredencial(usuario);
}

async function validarAutenticacao(token) {
  const credencial = usuarioCache.obterCredencialPorToken(token);

  if (!credencial || credencial.dataExpiracao < new Date()) {
    if (credencial) {
      usuarioCache.removerDoCache(credencial.token);
    }

    return false;
  }

  return true;
}

async function logout(token) {
  usuarioCache.removerDoCache(token);
}

async function obterTodos() {
  return await UsuarioModel.findAll();
}

async function obterPorId(id) {
  const usuario = await UsuarioModel.findByPk(id);

  if (!usuario) {
    throw new NaoEncontradoError(404, "Não foi possível encontrar o usuário pelo id " + id);
  }

  usuario.senha = undefined;

  return usuario;
}

async function cadastrar(usuarioDTO) {
  usuarioDTO.senha = geradorToken.gerarHashDaSenha(usuarioDTO.senha);

  const { email } = usuarioDTO;

  if (await UsuarioModel.findOne({ where: { email } })) {
    throw new ModeloInvalidoError(400, "E-mail já cadastrado, tente outro por favor.")
  }

  const usuario = await UsuarioModel.create(usuarioDTO);

  if (!usuario) {
    throw new AplicacaoError(500, "Falha ao cadastrar o usuário.")
  }

  usuario.senha = undefined;

  return usuario;
}

async function atualizar(usuarioDTO) {
  let usuario = await UsuarioModel.findByPk(usuarioDTO.id);

  if (!usuario) {
    throw new NaoEncontradoError(404, "Não foi possível encontrar o usuário pelo id " + id);
  }

  if (await UsuarioModel.findOne({ where: { email } })) {
    throw new ModeloInvalidoError(400, "E-mail já cadastrado, tente outro por favor.");
  }

  usuarioDTO.senha = usuario.senha;
  usuarioDTO.criadoEm = usuario.criadoEm;
  usuarioDTO.atualizadoEm = new Date();

  usuario = await UsuarioModel.update(usuarioDTO, { where: { id: usuarioDTO.id } });

  if (!usuario) {
    throw new AplicacaoError(500, "Falha em atualizar o usuário com id " + usuarioDTO.id);
  }

  usuarioDTO.senha = undefined;

  return usuarioDTO;
}

function _criarCredencial(usuario) {
  const dataExpiracao = geradorToken.gerarDataExpiracao();

  let credencial = usuarioCache.obterCredencialPorUsuario(usuario);

  if (credencial) {
    if (credencial.dataExpiracao < new Date()) {
      usuarioCache.removerDoCache(credencial.token);
    } else {
      usuarioCache.atualizarDataExpiracao(credencial.token, dataExpiracao);

      return credencial;
    }
  }

  const token = geradorToken.criarToken(usuario);
  usuario.senha = undefined;

  credencial = { token, usuario, dataExpiracao };

  usuarioCache.adicionarNoCache(credencial);

  return credencial;
}

module.exports = {
  validarUsuario,
  validarAutenticacao,
  logout,
  obterTodos,
  obterPorId,
  cadastrar,
  atualizar
}