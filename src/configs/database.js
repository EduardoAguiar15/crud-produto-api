let ambiente = undefined;

switch (process.env.PUBLICAR) {
  case "DEV":
    ambiente = configurarDEV();
    break;
  case "PROD":
    ambiente = configurarPROD();
    break;
  default:
    break;
}

function configurarDEV() {
  return {
    dialect: process.env.DEV_DIALECT,
    host: process.env.DEV_HOST,
    port: process.env.DEV_PORT,
    username: process.env.DEV_USER_NAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
  }
}

function configurarPROD() {
  return {
    dialect: process.env.PROD_DIALECT,
    host: process.env.PROD_HOST,
    port: process.env.PROD_PORT,
    username: process.env.PROD_USER_NAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE,
  }
}

module.exports = ambiente;