import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
import Producto from './productos.model.js';
import Pedido from './pedidos.model.js';
import Promocion from './promociones.model.js'; 

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class PedidoProducto extends Model {}

PedidoProducto.init({
  id: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  cantidad: {
    type: DataTypes.DECIMAL(9, 3),
    allowNull: false,
  },
  valor_unitario: {
    type: DataTypes.DECIMAL(11, 3),
    allowNull: false,
  },
  valor_unitario_promocion: {
    type: DataTypes.DECIMAL(11, 3),
    allowNull: false,
  },
  total_teorico: {
    type: DataTypes.DECIMAL(12, 3),
    allowNull: false,
  },
  total_final: {
    type: DataTypes.DECIMAL(12, 3),
    allowNull: false,
  },
  id_promocion: {
    type: DataTypes.MEDIUMINT,
    defaultValue: null,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  id_pedido: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'PedidoProducto',
  timestamps: false,
  tableName: 'pedidos_productos',
});

PedidoProducto.belongsTo(Producto, { foreignKey: 'id_producto' });
// Relación con Pedidos
PedidoProducto.belongsTo(Pedido, { foreignKey: 'id_pedido' });
// Relación con Promociones
PedidoProducto.belongsTo(Promocion, { foreignKey: 'id_promocion' });

export default PedidoProducto;
