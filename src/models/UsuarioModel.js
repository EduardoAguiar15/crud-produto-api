const { Model, DataTypes } = require('sequelize');

class UsuarioModel extends Model {
  static init(connection) {
    super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
    }, {
      sequelize: connection,
      schema: 'public',
      tableName: 'usuarios',
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
      timestamps: true
    })
  }
}

module.exports = UsuarioModel;