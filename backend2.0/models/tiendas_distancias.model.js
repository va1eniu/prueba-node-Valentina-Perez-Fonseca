import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
import Tienda from './tiendas.model.js';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class TiendaDistancia extends Model {}

TiendaDistancia.init({
  id: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  id_tienda: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  valor: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  desde: {
    type: DataTypes.SMALLINT,
    defaultValue: null,
  },
  hasta: {
    type: DataTypes.SMALLINT,
    defaultValue: null,
  },
}, {
  sequelize,
  modelName: 'TiendaDistancia',
  timestamps: false,
  tableName: 'tiendas_distancias',
});

TiendaDistancia.belongsTo(Tienda, { foreignKey: 'desde' });
// Relación con Tienda (Hasta)
TiendaDistancia.belongsTo(Tienda, { foreignKey: 'hasta' });

export default TiendaDistancia;
