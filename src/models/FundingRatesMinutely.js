const { DataTypes } = require("sequelize");
const { sequelize } = require("../pkg/sequelize/config");
const BaseModel = require("./BaseModel");

class FundingRatesMinutely extends BaseModel { }

const attributes = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  exchange: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  symbol: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  fundingRate: {
    type: DataTypes.DECIMAL(20, 4),
    allowNull: false,
  },
  fundingTime: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  collectedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

const options = {
  tableName: "funding_rates_minutely",
  sequelize,
  timestamps: true,
  indexes: [
    { unique: true, fields: ["exchange", "symbol", "fundingTime"] }
  ],
};

FundingRatesMinutely.init(attributes, options);

module.exports = FundingRatesMinutely;
