const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const Skill = require("./skill");
const sequelizeInstance = dbConnect.Sequelize;
class User extends Model {}
//Sequelize will create this table if it doesn't exist on startup
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,

    },
    displayPicture:{
        type: DataTypes.TEXT,
      allowNull: false,
      required: true,
    },
    skillId: {
        type: DataTypes.INTEGER, allowNull: true, required: false,
        references: {
            model: Skill, //reference to another model
            key: "id", //column name of the referenced model
            indexes: [{ unique: true }],
      }}
  },
  {
    sequelize: sequelizeInstance,
    modelName: "users", //uselowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = User;
