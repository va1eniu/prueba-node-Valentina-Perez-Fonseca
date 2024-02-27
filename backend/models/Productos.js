/* import mongoose from "mongoose";

const productosSchema =  new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El campo de nombre es requerido"],
    trim: true,
  },
  barcode: {
    type: Number,
    required: [true, "El campo de tipo es requerido"],
    trim: true,
  },
  presentacion: {
    type: String,
    trim: true,
  },
},
{
  timestamps: true
});

const productos = mongoose.model("productos", productosSchema, "productos");

export default productos;
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

class Productos extends Model {}

Productos.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de nombre es requerido',
        },
      },
    },
    barcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de tipo es requerido',
        },
      },
    },
    presentacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Productos',
    timestamps: true,
    tableName: 'productos',
  }
);


export default Productos;
 */

// productos.js
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

class Productos extends Model {}

Productos.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de nombre es requerido',
        },
      },
    },
    barcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de tipo es requerido',
        },
      },
    },
    presentacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Productos',
    timestamps: true,
    tableName: 'productos',
  }
);

export default Productos;
