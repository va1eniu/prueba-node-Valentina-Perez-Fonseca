import productos from "../models/Productos.js";

const obtenerproductoss = async (req, res) => {
  const productoss = await productos.find();
  res.json(productoss);
};

const agregarproductos = async (req, res) => {
  const nuevoproductos = new productos(req.body);

  try {
    const productosGuardado = await nuevoproductos.save();
    res.json(productosGuardado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al agregar el productos" });
  }
};

const borrarproductos = async (req, res) => {
  try {
    await productos.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "productos no encontrado" });
  }
};

const actualizarproductos = async (req, res) => {
  try {
    const productos = await productos.findOne({ _id: req.params.id });
    if (req.body.nombre) {
      productos.nombre = req.body.nombre;
    }
    if (req.body.tipo) {
      productos.tipo = req.body.tipo;
    }
    if (req.body.descripcion) {
      productos.descripcion = req.body.descripcion;
    }
    if (req.body.precio) {
      productos.precio = req.body.precio;
    }

    await productos.save();
    res.json(productos);
  } catch (error) {
    res.status(404).json({ error: "productos no encontrado" });
  }
};

const obtenerproductos = async (req, res) => {
  const productos = await productos.findOne({ _id: req.params.id });
  if (!productos) {
    return res.status(404).json({ error: "productos no encontrado" });
  }
  res.json(productos);
};

export {
  obtenerproductoss,
  agregarproductos,
  borrarproductos,
  actualizarproductos,
  obtenerproductos,
};
