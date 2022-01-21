'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: 'userId' });
      this.hasMany(models.users, { foreignKey: 'itemId' });
    }
  }
  items.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    group: DataTypes.STRING,
    expiration: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'items',
  });
  return items;
};