const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const User = require("./user");
const Skill = require("./skill");
const sequelizeInstance = dbConnect.Sequelize;

class Trade extends Model {}

// Sequelize will create this table if it doesn't exist on startup
Trade.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },

  initiatorUserId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    required: false,
    references: {
      model: User, //reference to another model
      key: "id", //column name of the referenced model
      indexes: [{ unique: true }],
    },
  },
  receiverUserId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    required: false,
    references: {
      model: User, //reference to another model
      key: "id", //column name of the referenced model
      indexes: [{ unique: true }],
    },
  },
  initiatorSkillId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    required: false,
    references: {
      model: Skill, //reference to another model
      key: "id", //column name of the referenced model
      indexes: [{ unique: true }],
    }},
    receiverSkillId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      required: false,
      references: {
        model: Skill, //reference to another model
        key: "id", //column name of the referenced model
        indexes: [{ unique: true }],
      },
    },
},
  
{
  sequelize: sequelizeInstance,
  modelName: "trades", // use lowercase plural format
  timestamps: true,
  freezeTableName: true,
});

module.exports = Trade;
