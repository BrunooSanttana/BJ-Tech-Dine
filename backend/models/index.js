const { Sequelize } = require('sequelize');
const config = require('../config/config.json');
const env = process.env.NODE_ENV || 'development'; 
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

const db = {};

// Configurar Sequelize
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos e adicionar ao objeto db
db.User = require('./users')(sequelize, Sequelize.DataTypes);
db.Category = require('./category')(sequelize, Sequelize.DataTypes);
db.Product = require('./product')(sequelize, Sequelize.DataTypes);
db.Client = require('./client')(sequelize, Sequelize.DataTypes);
db.Order = require('./order')(sequelize, Sequelize.DataTypes);



// Definir Relacionamentos
db.Category.hasMany(db.Product, { foreignKey: 'categoryId' });
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId' });


module.exports = db;
