import tiendas from "../models/Tiendas.js";

// Obtener todos los tiendass
const obtenertiendass = async (req, res) => {
  try {
    const tiendass = await tiendas.find();
    res.status(200).json(tiendass);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tiendass" });
  }
};

// Agregar un nuevo tiendas
const agregartiendas = async (req, res) => {
  try {
    const nuevotiendas = new tiendas(req.body);
    const tiendasGuardado = await nuevotiendas.save();
    res.status(201).json(tiendasGuardado);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el tiendas" });
  }
};

// Borrar un tiendas por ID
const borrartiendas = async (req, res) => {
  try {
    await tiendas.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al borrar el tiendas" });
  }
};

// Actualizar un tiendas por ID
const actualizartiendas = async (req, res) => {
  try {
    const tiendasActualizado = await tiendas.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(tiendasActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el tiendas" });
  }
};

// Obtener un tiendas por ID
const obtenertiendas = async (req, res) => {
  try {
    const tiendas = await tiendas.findById(req.params.id);
    if (!tiendas) {
      return res.status(404).json({ error: "tiendas no encontrado" });
    }
    res.status(200).json(tiendas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el tiendas" });
  }
};

export {
  obtenertiendass,
  agregartiendas,
  borrartiendas,
  actualizartiendas,
  obtenertiendas,
};
