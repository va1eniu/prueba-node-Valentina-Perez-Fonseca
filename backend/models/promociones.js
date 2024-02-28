/* import mongoose from "mongoose";

const promocionSchema =  new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El campo de nombre es requerido"],
    trim: true,
  },
  vigencia:{
    type: Date,
    required: [true, "La fecha de compra es requerida"],
    
  },
  
},
{
  timestamps: true
});

const promocion = mongoose.model("promocion", promocionSchema, "promocion");

export default promocion;

 */

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

class Promocion extends Model {}

Promocion.init(
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
    porcentaje: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'La fecha de compra es requerida',
        },
      },
    },
    valor: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'La fecha de compra es requerida',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Promocion',
    timestamps: true,
    tableName: 'promociones',
  }
);

export default Promocion;
