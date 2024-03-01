
import Tienda from "../models/tiendas.model.js";

const TiendaController = {
  getAllTiendaes: async (req, res) => {
    try {
      const Tiendaes = await Tienda.findAll();
      res.status(200).json(Tiendaes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTiendaById: async (req, res) => {
    const { id } = req.params;
    try {
      const Tienda = await Tienda.findOne({ _id: id });
      if (Tienda) {
        res.status(200).json(Tienda);
      } else {
        res.status(404).json({ message: 'Promoción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTienda: async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
      const nuevaTienda = await Tienda.create({ nombre, descripcion });
      res.status(201).json(nuevaTienda);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTienda: async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
      const Tienda = await Tienda.findOne({ _id: id });
      if (Tienda) {
        Tienda.nombre = nombre || Tienda.nombre;
        Tienda.descripcion = descripcion || Tienda.descripcion;
        await Tienda.save();
        res.status(200).json(Tienda);
      } else {
        res.status(404).json({ message: 'Promoción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTienda: async (req, res) => {
    const { id } = req.params;
    try {
      const Tienda = await Tienda.findOne({ _id: id });
      if (Tienda) {
        await Tienda.deleteOne({ _id: id });
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Promoción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default TiendaController;
