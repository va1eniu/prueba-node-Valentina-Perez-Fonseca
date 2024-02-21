import tiendas_productos from "../models/Tiendas_productos.js";

// Obtener todos los tiendas_productoss
const obtenertiendas_productoss = async (req, res) => {
  try {
    const tiendas_productoss = await tiendas_productos.find();
    res.status(200).json(tiendas_productoss);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tiendas_productoss" });
  }
};



// Agregar un nuevo tiendas_productos
const agregartiendas_productos = async (req, res) => {
  try {
    const nuevotiendas_productos = new tiendas_productos(req.body);
    const tiendas_productosGuardado = await nuevotiendas_productos.save();
    res.status(201).json(tiendas_productosGuardado);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el tiendas_productos" });
  }
};

// Borrar un tiendas_productos por ID
const borrartiendas_productos = async (req, res) => {
  try {
    await tiendas_productos.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al borrar el tiendas_productos" });
  }
};

// Actualizar un tiendas_productos por ID
const actualizartiendas_productos = async (req, res) => {
  try {
    const tiendas_productosActualizado = await tiendas_productos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(tiendas_productosActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el tiendas_productos" });
  }
};

// Obtener un tiendas_productos por ID
const obtenertiendas_productos = async (req, res) => {
  try {
    const tiendas_productos = await tiendas_productos.findById(req.params.id);
    if (!tiendas_productos) {
      return res.status(404).json({ error: "tiendas_productos no encontrado" });
    }
    res.status(200).json(tiendas_productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el tiendas_productos" });
  }
};

export {
  obtenertiendas_productoss,
  agregartiendas_productos,
  borrartiendas_productos,
  actualizartiendas_productos,
  obtenertiendas_productos,
};
