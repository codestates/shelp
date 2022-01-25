'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.items, { foreignKey: 'itemId' });
    }
  }
  recipes.init({
    itemId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    domain: DataTypes.STRING,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'recipes',
  });
  return recipes;
};