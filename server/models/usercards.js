'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userCards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userCards.init({
    isCut: DataTypes.BOOLEAN,
    remainValue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userCards',
  });
  return userCards;
};