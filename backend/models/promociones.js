import mongoose from "mongoose";

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
