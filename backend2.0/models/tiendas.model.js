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

class Tienda extends Model {}

Tienda.init({
  id: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull:  false,
  },
  descripcion: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 123,
  },
  direccion: {
    type: DataTypes.STRING(120),
    allowNull: false,
    defaultValue: 23,
  },
  direccion_anexo: {
    type: DataTypes.STRING(40),
    defaultValue: null,
  },
  direccion_barrio: {
    type: DataTypes.STRING(25),
    defaultValue: null,
  },
  calificacion: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  calificacion_cantidad: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
    defaultValue: 0,
  },
  impuestos: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  dias_trabajados: {
    type: DataTypes.STRING(21),
    allowNull: false,
    defaultValue: '[1,1,1,1,1,1,0]',
  },
}, {
  sequelize,
  modelName: 'Tienda',
  timestamps: false,
  tableName: 'tiendas',
});

export default Tienda;
