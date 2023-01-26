// Função require importa a biblioteca express e torna disponível para uso dentro da aplicação.
const express = require("express");
// Define a porta que a aplicação irá rodar
const port = 3000;
// Utilizando express para criar nossa aplicação.
const app = express();
// É uma função que analisa as request/JSON recebidas e coloca os dados no req.body
app.use(express.json());

require('dotenv').config();
require('./src/database');

// Importa o arquivo routes e faz o app utilizar
const routes = require("./routes");
app.use(routes);

// Inicia a aplicação na porta 3000
app.listen(port, () => console.log(`Api rodando na porta ${port}`));