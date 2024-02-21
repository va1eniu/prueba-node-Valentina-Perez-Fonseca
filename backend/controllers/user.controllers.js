import user from "../models/user.js";

const obtenerusers = async (req, res) => {
  const users = await user.find();
  res.json(users);
};

const agregaruser = async (req, res) => {
  const nuevouser = new user(req.body);

  try {
    const userGuardado = await nuevouser.save();
    res.json(userGuardado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al agregar el user" });
  }
};

const borraruser = async (req, res) => {
  try {
    await user.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "user no encontrado" });
  }
};

const actualizaruser = async (req, res) => {
  try {
    const user = await user.findOne({ _id: req.params.id });
    if (req.body.nombre) {
      user.nombre = req.body.nombre;
    }
    if (req.body.tipo) {
      user.tipo = req.body.tipo;
    }
    if (req.body.descripcion) {
      user.descripcion = req.body.descripcion;
    }
    if (req.body.precio) {
      user.precio = req.body.precio;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "user no encontrado" });
  }
};

const obteneruser = async (req, res) => {
  const user = await user.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(404).json({ error: "user no encontrado" });
  }
  res.json(user);
};

export {
  obtenerusers,
  agregaruser,
  borraruser,
  actualizaruser,
  obteneruser,
};
