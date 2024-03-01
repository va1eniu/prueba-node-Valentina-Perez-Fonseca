import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
/* import User from './users.model.js'; */

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class UserDireccion extends Model {}

UserDireccion.init({
  id: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  distancia: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'UserDireccion',
  timestamps: false,
  tableName: 'users_direcciones',
});

/* UserDireccion.belongsTo(User, { foreignKey: 'id_user' }); */

export default UserDireccion;
