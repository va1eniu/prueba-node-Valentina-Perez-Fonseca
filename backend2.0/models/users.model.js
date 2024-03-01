// users.model.js
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

class User extends Model {}

User.init({
  id: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
  },
  tipo: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  login: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.BIGINT,
    defaultValue: null,
    unique: true,
  },
  codigo_temporal: {
    type: DataTypes.MEDIUMINT,
    defaultValue: null,
  },
  correo: {
    type: DataTypes.STRING(70),
    defaultValue: null,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(120),
    defaultValue: null,
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps: false,
  tableName: 'users',
});

export default User;
