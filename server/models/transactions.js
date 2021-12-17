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
    incomeCategory: DataTypes.STRING,
    incomePrice: DataTypes.INTEGER,
    outcomeCategory: DataTypes.STRING,
    outcomePrice: DataTypes.INTEGER,
    outcomeIsCash: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};