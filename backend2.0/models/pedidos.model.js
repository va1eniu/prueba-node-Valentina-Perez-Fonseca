import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
/* import Tienda from './tiendas.model.js';
import PedidoEstado from './pedidos_estados.model.js';
import Carrito from './carritos.model.js';
import PedidoProducto from './pedidos_productos.model.js'; */

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class Pedido extends Model {}

Pedido.init({
  id: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  instrucciones: {
    type: DataTypes.STRING(500),
    defaultValue: null,
  },
  entrega_fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valor_productos: {
    type: DataTypes.DECIMAL(12, 3),
    allowNull: false,
  },
  valor_envio: {
    type: DataTypes.DECIMAL(10, 3),
    allowNull: false,
  },
  valor_descuento: {
    type: DataTypes.DECIMAL(12, 3),
    allowNull: false,
  },
  valor_cupon: {
    type: DataTypes.DECIMAL(11, 3),
    defaultValue: 0.000,
  },
  impuestos: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  valor_impuestos: {
    type: DataTypes.DECIMAL(11, 3),
    allowNull: false,
    defaultValue: 0.000,
  },
  valor_final: {
    type: DataTypes.DECIMAL(12, 3),
    allowNull: false,
  },
  calificacion: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: null,
  },
  id_tienda: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(160),
    defaultValue: null,
  },
  valor_comision: {
    type: DataTypes.DECIMAL(11, 3),
    allowNull: false,
    defaultValue: 0.000,
  },
  id_user: {
    type: DataTypes.MEDIUMINT,
    defaultValue: null,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Pedido',
  timestamps: false,
  tableName: 'pedidos',
});

/* Pedido.belongsTo(Tienda, { foreignKey: 'id_tienda' });

Pedido.hasMany(PedidoEstado, { foreignKey: 'id_pedido' });

Pedido.hasMany(Carrito, { foreignKey: 'id_pedido' });

Pedido.hasMany(PedidoProducto, { foreignKey: 'id_pedido' }); */

export default Pedido;
