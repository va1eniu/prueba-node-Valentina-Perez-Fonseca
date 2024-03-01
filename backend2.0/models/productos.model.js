import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class Producto extends Model {}

Producto.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 1,
  },
  kit: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 0,
  },
  barcode: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  presentacion: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(500),
    defaultValue: null,
  },
  foto: {
    type: DataTypes.STRING(120),
    defaultValue: null,
  },
  peso: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: true,
    defaultValue: 0.00,
  },
}, {
  sequelize,
    modelName: 'Producto',
    timestamps: false,
    tableName: 'productos',
});

export default Producto;


