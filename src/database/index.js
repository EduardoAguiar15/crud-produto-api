const Sequelize = require('sequelize');
const dbConfig = require('../configs/database');
const connection = new Sequelize(dbConfig);

const CategoriaModel = require('../models/CategoriaModel');
const ProdutoModel = require('../models/ProdutoModel');

CategoriaModel.init(connection);
ProdutoModel.init(connection);
ProdutoModel.associate(CategoriaModel);

module.exports = connection;