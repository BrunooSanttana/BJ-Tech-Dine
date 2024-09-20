module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'categories', // Nome da tabela no banco de dados
    timestamps: false,       // Não adicionar createdAt e updatedAt
  });

  // Associação com o modelo Product
  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId', // Chave estrangeira em Product
      as: 'products',           // Alias para a relação
    });
  };

  return Category;
};
