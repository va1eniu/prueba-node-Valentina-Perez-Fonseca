/* import promocion from "../models/promociones.js";

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
 */

import Promocion from "../models/promociones.js";

const PromocionController = {
  getAllPromociones: async (req, res) => {
    try {
      const promociones = await Promocion.findAll();
      res.status(200).json(promociones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPromocionById: async (req, res) => {
    const { id } = req.params;
    try {
      const promocion = await Promocion.findOne({ _id: id });
      if (promocion) {
        res.status(200).json(promocion);
      } else {
        res.status(404).json({ message: 'Promoción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPromocion: async (req, res) => {
    const { nombre, vigencia } = req.body;
    try {
      const nuevaPromocion = await Promocion.create({ nombre, vigencia });
      res.status(201).json(nuevaPromocion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePromocion: async (req, res) => {
    const { id } = req.params;
    const { nombre, vigencia } = req.body;
    try {
      const promocion = await Promocion.findOne({ _id: id });
      if (promocion) {
        promocion.nombre = nombre || promocion.nombre;
        promocion.vigencia = vigencia || promocion.vigencia;
        await promocion.save();
        res.status(200).json(promocion);
      } else {
        res.status(404).json({ message: 'Promoción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePromocion: async (req, res) => {
    const { id } = req.params;
    try {
      const promocion = await Promocion.findOne({ _id: id });
      if (promocion) {
        await promocion.deleteOne({ _id: id });
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Promoción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default PromocionController;
