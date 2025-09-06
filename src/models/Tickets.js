const { DataTypes } = require("sequelize");
const { sequelize } = require("../pkg/sequelize/config");
const BaseModel = require("./BaseModel");

class Tickers extends BaseModel {
  static association() {}
}

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  symbol: { type: DataTypes.STRING(20) },
  event_time: { type: DataTypes.BIGINT },
  last_price: { type: DataTypes.DECIMAL },
  price_change: { type: DataTypes.DECIMAL },
  price_change_percent: { type: DataTypes.DECIMAL },
  weighted_avg_price: { type: DataTypes.DECIMAL },
  volume: { type: DataTypes.DECIMAL },
  quote_volume: { type: DataTypes.DECIMAL },
  open_price: { type: DataTypes.DECIMAL },
  high_price: { type: DataTypes.DECIMAL },
  low_price: { type: DataTypes.DECIMAL },
  trade_count: { type: DataTypes.BIGINT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
};

const options = {
  tableName: "tickers",
  sequelize,
  timestamps: true,
};

Tickers.init(attributes, options);

module.exports = Tickers;
