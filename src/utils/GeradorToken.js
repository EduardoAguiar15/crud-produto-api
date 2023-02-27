const md5 = require("md5");
const SECRET = "nutella";

function gerarHashDaSenha(senha) {
    return md5(`@${senha}:${SECRET}@`)
}

function criarToken(usuario) {
    const emailBase64 = Buffer.from(usuario.email).toString('base64');
    const data = new Date();
    const token = md5(`${emailBase64}.${SECRET}.${data.getTime()}`);

    return token;
}
function gerarDataExpiracao() {
    const data = new Date();
    const duracao = process.env.DURACAO_TOKEN * 60000;
    const dataExpiracao = new Date(data.getTime() + duracao);

    return dataExpiracao;
}

module.exports = {
    gerarHashDaSenha,
    criarToken,
    gerarDataExpiracao
}