import { Schema } from "mongoose";
import mongoose from "mongoose";
import Productos from './Productos.js';
import promocion from "./promociones.js";

const tiendasSchema = new mongoose.Schema({
  Producto: {
    type: Schema.Types.ObjectId,
    dest : String,
    trim: true,
  },
  Productos: { type: mongoose.Schema.Types.ObjectId, ref: 'productos' },
  valor: {
    type: Number,
    required: [true, "El campo de telefono es requerido"],
    trim: true,
  },
  compra_maxima: {
    type:Number,
    required: true,
  },
  promociones: {
    promocion: { type: mongoose.Schema.Types.ObjectId, ref: 'promocion' },
  }
},
{
  timestamps: true
});

const tiendas = mongoose.model("tiendas", tiendasSchema, "tiendas");

export default tiendas;
