import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
/* import UserDireccion from './users_direcciones.model.js'; */

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class UserCliente extends Model {}

UserCliente.init({
  id: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  telefono: {
    type: DataTypes.BIGINT,
    defaultValue: null,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(60),
    defaultValue: null,
  },
  genero: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
  },
  nacimiento: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  identificacion: {
    type: DataTypes.STRING(20),
    defaultValue: null,
  },
  id_direccion: {
    type: DataTypes.MEDIUMINT,
    defaultValue: null,
  },
  id_user: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'UserCliente',
  timestamps: false,
  tableName: 'users_clientes',
});

/* 
UserCliente.hasMany(UserDireccion, { foreignKey: 'id_user' }); */

export default UserCliente;
