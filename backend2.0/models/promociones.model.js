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

class Promocion extends Model {}

Promocion.init({
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
  nombre: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING(120),
    defaultValue: null,
  },
  porcentaje: {
    type: DataTypes.TINYINT,
    defaultValue: null,
  },
  dias_semana: {
    type: DataTypes.STRING(21),
    allowNull: false,
    defaultValue: '[0,0,0,0,0,0,0]',
  },
}, {
  sequelize,
  modelName: 'Promocion',
  timestamps: false,
  tableName: 'promociones',
});

export default Promocion;
