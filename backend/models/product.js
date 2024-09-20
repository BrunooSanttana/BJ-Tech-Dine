module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'categoryId',
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },    
  }, {
    tableName: 'products', // Nome da tabela no banco de dados
    timestamps: true,     // Não adicionar createdAt e updatedAt
  });

  // Associação com o modelo Category
  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });
  };

  return Product;
};
