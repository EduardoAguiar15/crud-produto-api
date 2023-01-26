const ModeloInvalidoError = class ModeloInvalidoError {
    /**
     * Classe utilizada para exceções do modelo
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor (status, mensagem) {
        this.status = status || 400;
        this.message = mensagem || "Omodelo informando é invalido.";
        this.name = "ModeloInvalido";
        this.stack = (new Error()).stack;
    }
}
const NaoEncontradoError = class NaoEncontradoError {
     /**
     *  Classe utilizada para exceções do objeto ou recursos não encontrados
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
const AplicacaoError = class AplicacaoError {
     /**
     * Classe utilizada para exceções e erros interno da aplicação
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor (status, mensagem) {
        this.status = status || 500;
        this.message = `Erro interno na aplicação ${mensagem && '- ' + mensagem}`;
        this.name = "Aplicação";
        this.stack = (new Error()).stack;
    }
}
module.exports = {
    ModeloInvalidoError,
    NaoEncontradoError,
    AplicacaoError
}