module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'clients', // Certifique-se de que a tabela é especificada corretamente
      timestamps: true // Certifique-se de que timestamps estão habilitados se você está usando createdAt e updatedAt
    });
  
    return Client;
  };
  