const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const User = require("./user");
const sequelizeInstance = dbConnect.Sequelize;

class Skill extends Model {}

// Sequelize will create this table if it doesn't exist on startup
Skill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    skillName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
  },
  {
    sequelize: sequelizeInstance,
    modelName: "skills", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Skill;