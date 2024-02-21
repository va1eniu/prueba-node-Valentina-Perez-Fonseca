import { Schema } from "mongoose";
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

