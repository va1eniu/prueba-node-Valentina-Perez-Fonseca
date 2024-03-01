// promociones.controller.js
import { Promocion, Tienda } from '../models';

// Método para crear una nueva promoción
export const crearPromocion = async (req, res) => {
  try {
    // Obtener datos del cuerpo de la solicitud
    const { tiendaId, descripcion, descuento, fechaInicio, fechaFin } = req.body;

    // Validar datos requeridos
    if (!tiendaId || !descripcion || !descuento || !fechaInicio || !fechaFin) {
      return res.status(400).json({ mensaje: 'Todos los campos son requeridos.' });
    }

    // Verificar si la tienda existe
    const tiendaExistente = await Tienda.findByPk(tiendaId);
    if (!tiendaExistente) {
      return res.status(404).json({ mensaje: 'Tienda no encontrada.' });
    }

    // Validar que las fechas de inicio y fin sean válidas
    const fechaInicioValida = !isNaN(Date.parse(fechaInicio));
    const fechaFinValida = !isNaN(Date.parse(fechaFin));
    if (!fechaInicioValida || !fechaFinValida || fechaInicio >= fechaFin) {
      return res.status(400).json({ mensaje: 'Fechas de inicio y fin no válidas.' });
    }

    // Crear la nueva promoción
    const nuevaPromocion = await Promocion.create({
      tiendaId,
      descripcion,
      descuento,
      fechaInicio,
      fechaFin,
    });

    // Retornar la nueva promoción creada
    return res.status(201).json(nuevaPromocion);
  } catch (error) {
    console.error('Error al crear una promoción:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

// Agrega más métodos del controlador según sea necesario...
// promociones.controller.js
// ...

// Método para obtener todas las promociones de una tienda
export const obtenerPromocionesPorTienda = async (req, res) => {
    try {
      // Obtener el ID de la tienda desde los parámetros de la solicitud
      const { tiendaId } = req.params;
  
      // Verificar si la tienda existe
      const tiendaExistente = await Tienda.findByPk(tiendaId);
      if (!tiendaExistente) {
        return res.status(404).json({ mensaje: 'Tienda no encontrada.' });
      }
  
      // Obtener todas las promociones asociadas a la tienda
      const promociones = await Promocion.findAll({
        where: {
          tiendaId,
        },
      });
  
      // Retornar las promociones obtenidas
      return res.status(200).json(promociones);
    } catch (error) {
      console.error('Error al obtener promociones por tienda:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  };
  
  // Método para obtener una promoción por su ID
  export const obtenerPromocionPorId = async (req, res) => {
    try {
      // Obtener el ID de la promoción desde los parámetros de la solicitud
      const { promocionId } = req.params;
  
      // Obtener la promoción por su ID
      const promocion = await Promocion.findByPk(promocionId);
  
      // Verificar si la promoción existe
      if (!promocion) {
        return res.status(404).json({ mensaje: 'Promoción no encontrada.' });
      }
  
      // Retornar la promoción obtenida
      return res.status(200).json(promocion);
    } catch (error) {
      console.error('Error al obtener una promoción por ID:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  };
  
  // Agrega más métodos del controlador según sea necesario...
  