import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El campo de nombre es requerido"],
    trim: true,
  }
},
{
  timestamps: true
});

const user = mongoose.model("user", userSchema, "user");

export default user;
