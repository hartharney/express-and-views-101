import { DataTypes, Model } from "sequelize";
import db from '../Config/database.config';
import { ProductInstance } from "./productSchema";


export interface userAttributes {

    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    address: string;
    password: string;

}


export class userInstance extends Model<userAttributes>{
        password(password: any, password1: any) {
        throw new Error('Method not implemented.');
    }
}


userInstance.init({

    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate:{
            notNull:{
                msg: 'Email Address is required'
            },
            isEmail:{
                msg: 'Please enter a valid email address...'
            }
        },
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'users',
    sequelize: db
})


userInstance.hasMany(ProductInstance, { foreignKey : 'userId', as : 'products'});
ProductInstance.belongsTo(userInstance, { foreignKey : 'userId', as : 'users'});


