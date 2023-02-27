const { Model, DataTypes } = require('sequelize')

class ProdutoModel extends Model {
  static associate(model) {
    ProdutoModel.belongsTo(model, {
      foreignKey: 'categoriaId',
      onDelete: 'CASCADE'
    })
  }
  static init(connection) {
    super.init({
      nome: DataTypes.STRING,
      valor: DataTypes.DOUBLE,
      qtdEstoque: DataTypes.INTEGER,
      categoriaId: DataTypes.BIGINT
    }, {
      sequelize: connection,
      schema: 'public',
      tableName: 'produtos',
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
      timestamps: true
    })
  }
}

module.exports = ProdutoModel;