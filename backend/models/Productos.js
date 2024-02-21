import mongoose from "mongoose";

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
