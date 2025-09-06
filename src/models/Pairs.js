const { DataTypes } = require("sequelize");
const { sequelize } = require("../pkg/sequelize/config");
const BaseModel = require("./BaseModel");

class Pairs extends BaseModel {
  static association(models) {
    Pairs.belongsTo(models.Asset, { foreignKey: "base_asset_id", as: "baseAsset" });
    Pairs.belongsTo(models.Asset, { foreignKey: "quote_asset_id", as: "quoteAsset" });
    Pairs.hasMany(models.Market, { foreignKey: "pair_id", as: "markets" });
  }
}

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  symbol: { type: DataTypes.STRING(50), allowNull: false },
  base_asset_id: { type: DataTypes.STRING(50), allowNull: false },
  quote_asset_id: { type: DataTypes.STRING(50), allowNull: false },
  is_del: {
    type: DataTypes.SMALLINT(10),
    allowNull: true,
    defaultValue: 0
  },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
};

const options = {
  tableName: "pairs",
  sequelize,
  timestamps: true,
};

Pairs.init(attributes, options);

module.exports = Pairs;
