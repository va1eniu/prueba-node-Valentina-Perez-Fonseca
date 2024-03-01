// carritos.model.js
import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
import Producto from './productos.model.js';
import Tienda from './tiendas.model.js'; 
import User from './users.model.js';
import TiendasProductos from './tiendas_productos.model.js';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class Carrito extends Model {}

Carrito.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  cantidad: {
    type: DataTypes.DECIMAL(9, 3),
    allowNull: false,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_tienda: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Carrito',
  timestamps: false,
  tableName: 'carritos',
});

// Ajuste en las asociaciones
Carrito.belongsTo(Producto, { foreignKey: 'id_producto', targetKey: 'id' });
Carrito.belongsTo(Tienda, { foreignKey: 'id_tienda' });
Carrito.belongsTo(User, { foreignKey: 'id_user' });

Carrito.belongsTo(TiendasProductos, { foreignKey: 'id_producto', targetKey: 'id_producto', as: 'TiendasProducto' });

export default Carrito;
