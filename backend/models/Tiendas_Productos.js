/* import { Schema } from "mongoose";
import mongoose from "mongoose";

const tiendasSchema = new mongoose.Schema({
  idProducto: {
    type: Schema.Types.ObjectId,
    dest : String,
    trim: true,
  },
  tienda: {
    type: String,
    required: [true, "El campo de correo es requerido"],
    trim: true,
  },
  valor: {
    type: Number,
    required: [true, "El campo de telefono es requerido"],
    trim: true,
  },
  compra_maxima: {
    type:Number,
    required: true,
  },
},
{
  timestamps: true
});

const tiendas = mongoose.model("tiendas", tiendasSchema, "tiendas");

export default tiendas;

 */
/* import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class Tiendas extends Model {}

Tiendas.init(
  {
    idProducto: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    tienda: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de tienda es requerido',
        },
      },
    },
    valor: {
      type: DataTypes.NUMERIC, // Cambiado a NUMERIC
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de valor es requerido',
        },
      },
    },
    compra_maxima: {
      type: DataTypes.NUMERIC, // Cambiado a NUMERIC
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de compra máxima es requerido',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Tiendas',
    timestamps: true,
    tableName: 'tiendas',
  }
);

// Sincronización automática con la opción force
(async () => {
  try {
    await sequelize.authenticate();
    console.log(`Conexión establecida con éxito a la base de datos.`);
    await sequelize.sync({ force: true }); // Cambiado a force: true
    console.log(`Base de datos sincronizada.`);
  } catch (error) {
    console.error(`Error al conectar o sincronizar la base de datos: ${error.message}`);
  }
})();

export default Tiendas;
 */

// tiendasProductos.js
// Tiendas_Productos.js
import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
import Tiendas from './Tiendas.js';
import Promociones from './Promociones.js'; // Agregar importación de Promociones

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

class TiendasProductos extends Model {}

TiendasProductos.init(
  {
    id_tienda: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    id_producto: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    valor: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de valor es requerido',
        },
      },
    },
    compra_maxima: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de compra máxima es requerido',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'TiendasProductos',
    timestamps: true,
    tableName: 'tiendas_productos',
  }
);

// Definir relaciones
TiendasProductos.belongsTo(Tiendas, { foreignKey: 'id_tienda' });
TiendasProductos.belongsTo(Promociones, { foreignKey: 'id_promocion' }); // Agregar relación con Promociones

export default TiendasProductos;

