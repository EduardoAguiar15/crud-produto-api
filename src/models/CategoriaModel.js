const { Model, DataTypes } = require('sequelize');

class CategoriaModel extends Model {
  static init(connection) {
    super.init({
      descricao: DataTypes.STRING,
    }, {
      sequelize: connection,
      schema: 'public',
      tableName: 'categorias',
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
      timestamps: true
    })
  }
}

module.exports = CategoriaModel;