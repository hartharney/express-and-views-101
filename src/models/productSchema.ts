import { DataTypes, Model } from "sequelize";
import db from '../Config/database.config';

export interface ProductAttributes{
    id: string;
    name: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    countInStock: number;
    imageUrl: string;
    userId: string;
}


export class ProductInstance extends Model<ProductAttributes>{
  userId: any;
}


ProductInstance.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    countInStock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING
    }
},
{
    tableName: 'products',
    sequelize: db
})