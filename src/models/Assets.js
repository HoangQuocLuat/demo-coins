const { DataTypes } = require("sequelize");
const { sequelize } = require("../pkg/sequelize/config");
const BaseModel = require("./BaseModel");

class Assets extends BaseModel {
  static association(models) {
    Assets.hasMany(models.Pair, { foreignKey: "base_asset_id", as: "basePairs" });
    Assets.hasMany(models.Pair, { foreignKey: "quote_asset_id", as: "quotePairs" });
  }
}

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  symbol: { type: DataTypes.STRING(20), allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
};

const options = {
  tableName: "assets",
  sequelize,
  timestamps: true,
};

Assets.init(attributes, options);

module.exports = Assets;
