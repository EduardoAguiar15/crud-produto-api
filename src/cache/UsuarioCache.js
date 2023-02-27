const { NaoAutorizadoError } = require("../errors/typeError");

let usuariosLogados = [];

function adicionarNoCache(credencial) {
    if (!credencial || !credencial.usuario || !credencial.token || !credencial.dataExpiracao) {
        throw new NaoAutorizadoError();
    }

    usuariosLogados.push(credencial);
}

function removerDoCache(token) {
    const index = usuariosLogados.findIndex(credencial => credencial.token == token);

    if (!isNaN(index)) {
        usuariosLogados.splice(index, 1);
    }
}

function obterCredencialPorUsuario(usuario) {
    const credencial = usuariosLogados.find(credencial => credencial.usuario.id == usuario.id);

    return credencial;
}

function obterCredencialPorToken(token) {
    const credencial = usuariosLogados.find(credencial => credencial.token == token);

    return credencial;
}

function atualizarDataExpiracao (token, dataExpiracao){
    const index = usuariosLogados.findIndex(credencial => credencial.token == token);

    if(!isNaN(index)) {
        usuariosLogados[index].dataExpiracao = dataExpiracao;
    }
}

module.exports = {
    adicionarNoCache,
    removerDoCache,
    obterCredencialPorToken,
    obterCredencialPorUsuario,
    atualizarDataExpiracao
}