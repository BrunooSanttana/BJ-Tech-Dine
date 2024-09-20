module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      tableNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    }, {
      tableName: 'orders',
      timestamps: true,
    });
  
    return Order;
  };
  