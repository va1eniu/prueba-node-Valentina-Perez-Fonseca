import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
import Tienda from './tiendas.model.js';
import Promocion from './promociones.model.js';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class TiendaPromocion extends Model {}

TiendaPromocion.init({
  id: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_tienda: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  id_promocion: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'TiendaPromocion',
  timestamps: false,
  tableName: 'tiendas_promociones',
});

TiendaPromocion.belongsTo(Tienda, { foreignKey: 'id_tienda' });
TiendaPromocion.belongsTo(Promocion, { foreignKey: 'id_promocion' });

Promocion.hasMany(TiendaPromocion, { foreignKey: 'id_promocion' });

export default TiendaPromocion;
