import { Promocion, Tienda } from '../models';

export const crearPromocion = async (req, res) => {
  try {
    const { tiendaId, descripcion, descuento, fechaInicio, fechaFin } = req.body;

    if (!tiendaId || !descripcion || !descuento || !fechaInicio || !fechaFin) {
      return res.status(400).json({ mensaje: 'Todos los campos son requeridos.' });
    }
    const tiendaExistente = await Tienda.findByPk(tiendaId);
    if (!tiendaExistente) {
      return res.status(404).json({ mensaje: 'Tienda no encontrada.' });
    }

    const fechaInicioValida = !isNaN(Date.parse(fechaInicio));
    const fechaFinValida = !isNaN(Date.parse(fechaFin));
    if (!fechaInicioValida || !fechaFinValida || fechaInicio >= fechaFin) {
      return res.status(400).json({ mensaje: 'Fechas de inicio y fin no válidas.' });
    }

    const nuevaPromocion = await Promocion.create({
      tiendaId,
      descripcion,
      descuento,
      fechaInicio,
      fechaFin,
    });

    return res.status(201).json(nuevaPromocion);
  } catch (error) {
    console.error('Error al crear una promoción:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

export const obtenerPromocionesPorTienda = async (req, res) => {
    try {
 
      const { tiendaId } = req.params;

      const tiendaExistente = await Tienda.findByPk(tiendaId);
      if (!tiendaExistente) {
        return res.status(404).json({ mensaje: 'Tienda no encontrada.' });
      }

      const promociones = await Promocion.findAll({
        where: {
          tiendaId,
        },
      });
  
      return res.status(200).json(promociones);
    } catch (error) {
      console.error('Error al obtener promociones por tienda:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  };

  export const obtenerPromocionPorId = async (req, res) => {
    try {
      const { promocionId } = req.params;

      const promocion = await Promocion.findByPk(promocionId);
  
      if (!promocion) {
        return res.status(404).json({ mensaje: 'Promoción no encontrada.' });
      }

      return res.status(200).json(promocion);
    } catch (error) {
      console.error('Error al obtener una promoción por ID:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  };

  