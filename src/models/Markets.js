const { DataTypes } = require("sequelize");
const { sequelize } = require("../pkg/sequelize/config");
const BaseModel = require("./BaseModel");

class Markets extends BaseModel {
  static association(models) {
    Markets.belongsTo(models.Pair, { foreignKey: "pair_id", as: "pair" });
  }
}

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pair_id: { type: DataTypes.STRING(50), allowNull: false },
  exchange: { type: DataTypes.STRING(50), allowNull: false },
  market_type: { type: DataTypes.STRING(50), allowNull: false }, // spot, futures, perpetual...
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
};

const options = {
  tableName: "markets",
  sequelize,
  timestamps: true,
};

Markets.init(attributes, options);

module.exports = Markets;
