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

class PedidoEstado extends Model {}

PedidoEstado.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  id_pedido: {
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
  modelName: 'PedidoEstado',
  timestamps: false,
  tableName: 'pedidos_estados',
});
/* const setPedidoAssociation = async () => {
  const { default: Pedido } = await import('./pedidos.model.js');
  PedidoProducto.belongsTo(Pedido, { foreignKey: 'id_pedido' });
};

setPedidoAssociation(); */

export default PedidoEstado;
