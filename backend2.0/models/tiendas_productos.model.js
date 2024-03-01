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

import Producto from './productos.model.js';
import Tienda from './tiendas.model.js';
import Promocion from './promociones.model.js';

class TiendasProductos extends Model {}

TiendasProductos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_tienda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tienda,
        key: 'id',
      },
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Producto,
        key: 'id',
      },
    },
    id_promocion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Promocion,
        key: 'id_promocion',
      },
    },
    valor: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    compra_maxima: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'TiendasProductos',
    timestamps: false,
    tableName: 'tiendas_productos',
  }
);

TiendasProductos.belongsTo(Tienda, { foreignKey: 'id_tienda' });
/* TiendasProductos.belongsTo(Producto, { foreignKey: 'id_producto' }); */
TiendasProductos.belongsTo(Promocion, { foreignKey: 'id_promocion' });
TiendasProductos.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });


export default TiendasProductos;
