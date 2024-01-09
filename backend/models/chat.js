const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const Users = require("./user")

class Chat extends Model { }
//Sequelize will create this table if it doesn't exist on startup
Chat.init({
    id: {
        type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
    },

    senderID: {
        type: DataTypes.INTEGER, allowNull: true, required: false,
        references: {
            model: Users, //reference to another model
            key: "id", //column name of the referenced model
            indexes: [{ unique: true }],
        }
    },
    receiverID: {
        type: DataTypes.INTEGER, allowNull: true, required: false,
        references: {
            model: Users, //reference to another model
            key: "id", //column name of the referenced model
            indexes: [{ unique: true }],
        }
    },
    message: {
        type: DataTypes.STRING, allowNull: true, required: false
    }
   
},
    {
        sequelize: sequelizeInstance, modelName: 'chat', timestamps: true, freezeTableName: true
    }
)
module.exports = Chat;
