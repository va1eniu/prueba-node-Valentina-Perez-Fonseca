/* import Tiendas_promociones from "../models/Tiendas_promociones.js";

const Tiendas_promocionesController = {
  getAllTiendas_promocioneses: async (req, res) => {
    try {
      const tiendas_promociones = await Tiendas_promociones.findAll();
      res.status(200).json(tiendas_promociones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTiendas_promocionesById: async (req, res) => {
    const { id } = req.params;
    try {
      const tiendas_promociones = await Tiendas_promociones.findOne({ where: { id } });
      if (tiendas_promociones) {
        res.status(200).json(tiendas_promociones);
      } else {
        res.status(404).json({ message: 'Promoción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTiendas_promociones: async (req, res) => {
    const { nombre, estado, fecha_inicio, fecha_fin, id_tienda, id_promocion } = req.body;
    try {
      const nuevaTiendas_promociones = await Tiendas_promociones.create({ 
        nombre, 
        estado, 
        fecha_inicio, 
        fecha_fin, 
        id_tienda, 
        id_promocion 
      });
      res.status(201).json(nuevaTiendas_promociones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTiendas_promociones: async (req, res) => {
    const { id } = req.params;
    const { nombre, estado, fecha_inicio, fecha_fin, id_tienda, id_promocion } = req.body;
    try {
      const tiendas_promociones = await Tiendas_promociones.findOne({ where: { id } });
      if (tiendas_promociones) {
        tiendas_promociones.nombre = nombre || tiendas_promociones.nombre;
        tiendas_promociones.estado = estado || tiendas_promociones.estado;
        tiendas_promociones.fecha_inicio = fecha_inicio || tiendas_promociones.fecha_inicio;
        tiendas_promociones.fecha_fin = fecha_fin || tiendas_promociones.fecha_fin;
        tiendas_promociones.id_tienda = id_tienda || tiendas_promociones.id_tienda;
        tiendas_promociones.id_promocion = id_promocion || tiendas_promociones.id_promocion;

        await tiendas_promociones.save();
        res.status(200).json(tiendas_promociones);
      } else {
        res.status(404).json({ message: 'Promoción no encontrada' });
      }
    // Ejemplo de cómo imprimir errores en la consola
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
  
  },

  deleteTiendas_promociones: async (req, res) => {
    const { id } = req.params;
    try {
      const tiendas_promociones = await Tiendas_promociones.findOne({ where: { id } });
      if (tiendas_promociones) {
        await Tiendas_promociones.destroy({ where: { id } });
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Promoción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};



export default Tiendas_promocionesController;
 */