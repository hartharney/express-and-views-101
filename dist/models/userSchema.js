"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../Config/database.config"));
const productSchema_1 = require("./productSchema");
class userInstance extends sequelize_1.Model {
    password(password, password1) {
        throw new Error('Method not implemented.');
    }
}
exports.userInstance = userInstance;
userInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email Address is required'
            },
            isEmail: {
                msg: 'Please enter a valid email address...'
            }
        },
        allowNull: false
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    sequelize: database_config_1.default
});
userInstance.hasMany(productSchema_1.ProductInstance, { foreignKey: 'userId', as: 'products' });
productSchema_1.ProductInstance.belongsTo(userInstance, { foreignKey: 'userId', as: 'users' });
