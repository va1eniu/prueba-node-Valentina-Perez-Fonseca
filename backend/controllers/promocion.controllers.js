import promocion from "../models/promociones.js";

const obtenerpromocions = async (req, res) => {
  const promocions = await promocion.find();
  res.json(promocions);
};

const agregarpromocion = async (req, res) => {
  const nuevopromocion = new promocion(req.body);

  try {
    const promocionGuardado = await nuevopromocion.save();
    res.json(promocionGuardado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al agregar el promocion" });
  }
};

const borrarpromocion = async (req, res) => {
  try {
    await promocion.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "promocion no encontrado" });
  }
};

const actualizarpromocion = async (req, res) => {
  try {
    const promocion = await promocion.findOne({ _id: req.params.id });
    if (req.body.modelo) {
      promocion.modelo = req.body.modelo;
    }
    if (req.body.año) {
      promocion.año = req.body.año;
    }
    if (req.body.precio) {
      promocion.precio = req.body.precio;
    }
    if (req.body.motor) {
      promocion.motor = req.body.motor;
    }
    if (req.body.coloresDisponibles) {
      promocion.coloresDisponibles = req.body.coloresDisponibles;
    }

    await promocion.save();
    res.json(promocion);
  } catch (error) {
    res.status(404).json({ error: "promocion no encontrado" });
  }
};

const obtenerpromocion = async (req, res) => {
  const promocion = await promocion.findOne({ _id: req.params.id });
  if (!promocion) {
    return res.status(404).json({ error: "promocion no encontrado" });
  }
  res.json(promocion);
};

export {
  obtenerpromocions,
  agregarpromocion,
  borrarpromocion,
  actualizarpromocion,
  obtenerpromocion,
};
