const ModeloInvalidoError = class ModeloInvalidoError {
    /**
     * Classe utilizada para exceções do modelo
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor (status, mensagem) {
        this.status = status || 400;
        this.message = mensagem || "O modelo informando é invalido.";
        this.name = "ModeloInvalido";
        this.stack = (new Error()).stack;
    }
}
const NaoEncontradoError = class NaoEncontradoError {
     /**
     *  Classe utilizada para exceções de acessos ou recursos não autorizado
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor (status, mensagem) {
        this.status = status || 404;
        this.message = mensagem || "Nao encontrado.";
        this.name = "NaoEncontrado";
        this.stack = (new Error()).stack;
    }
}
const NaoAutorizadoError = class NaoAutorizadoError {
    /**
     * Classe utilizada para exceções de acessos ou recursos não autorizados.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status, mensagem) {
      this.status = status || 404;
      this.message = mensagem || "Não Autorizado.";
      this.name = "NaoAutorizado";
      this.stack = (new Error()).stack;
    }
  }
const AplicacaoError = class AplicacaoError {
     /**
     * Classe utilizada para erros internos da aplicação
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor (status, mensagem) {
        this.status = status || 500;
        this.message = `Erro interno na aplicação ${mensagem && '- ' + mensagem}`;
        this.name = "Aplicacao";
        this.stack = (new Error()).stack;
    }
}
module.exports = {
    ModeloInvalidoError,
    NaoEncontradoError,
    NaoAutorizadoError,
    AplicacaoError
}