const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const User = require("./user");
const Trade = require("./trade");
const sequelizeInstance = dbConnect.Sequelize;

class Review extends Model {}

// Sequelize will create this table if it doesn't exist on startup
Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      validate: {
        min: 0,
        max: 5,
      }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    initiatorId: {
      type: DataTypes.INTEGER, allowNull: true, required: false,
      references: {
          model: User, //reference to another model
          key: "id", //column name of the referenced model
          indexes: [{ unique: true }],
    }},
    receiverId: {
      type: DataTypes.INTEGER, allowNull: true, required: false,
      references: {
          model: User, //reference to another model
          key: "id", //column name of the referenced model
          indexes: [{ unique: true }],
    }},
    tradeId: {
      type: DataTypes.INTEGER, allowNull: true, required: false,
      references: {
          model: Trade, //reference to another model
          key: "id", //column name of the referenced model
          indexes: [{ unique: true }],
        }
  }},
  
  {
    sequelize: sequelizeInstance,
    modelName: "reviews", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Review;