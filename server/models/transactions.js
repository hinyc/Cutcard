'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  transactions.init({
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    isIncome: DataTypes.BOOLEAN,
    outcomeIsCash: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};