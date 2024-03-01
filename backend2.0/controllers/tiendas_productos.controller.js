import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import TiendasProductos from '../models/tiendas_productos.model.js';
import Productos from '../models/productos.model.js';
import Tiendas from '../models/tiendas.model.js';
import Promocion from '../models/promociones.model.js';
import TiendasPromocion from '../models/tiendas_promociones.model.js';

const TiendasPController = {
  asociarProductoATienda: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id_producto, id_tienda, id_promocion, valor, compra_maxima } = req.body;

      const productoExistente = await Productos.findByPk(id_producto);
      const tiendaExistente = await Tiendas.findByPk(id_tienda);

      if (!productoExistente || !tiendaExistente) {
        return res.status(404).json({ error: 'Producto o tienda no encontrada' });
      }

      const asociacionExistente = await TiendasProductos.findOne({
        where: { id_producto, id_tienda },
      });

      if (asociacionExistente) {
        return res.status(400).json({ error: 'El producto ya está asociado a la tienda' });
      }

      const nuevaAsociacion = await TiendasProductos.create({
        id_producto,
        id_tienda,
        id_promocion,
        valor,
        compra_maxima,
      });

      res.status(201).json(nuevaAsociacion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  getProductosByTienda: async (req, res) => {
    try {
      const { id_tienda } = req.params;

      const productos = await TiendasProductos.findAll({
        where: { id_tienda },
        include: [
          {
            model: Productos,
            as: 'producto',
            attributes: ['nombre', 'barcode'],
          },
          {
            model: Promocion,
            required: false,
            where: {
              estado: 1,
            },
            attributes: ['porcentaje'],
            include: [
              {
                model: TiendasPromocion,
                required: true,
                where: {
                  id_tienda,
                  estado: 1,
                  inicio: { [Op.lte]: new Date() },
                  fin: { [Op.gte]: new Date() },
                },
                attributes: ['porcentaje'],
              },
            ],
          },
          {
            model: TiendasPromocion,
            required: false,
            where: {
              id_tienda,
              estado: 1,
              inicio: { [Op.lte]: new Date() },
              fin: { [Op.gte]: new Date() },
            },
            attributes: ['id_promocion', 'porcentaje'],
            as: 'tiendaPromocion',
          },
        ],
      });

      const productosFormateados = productos.map(producto => {
        const { nombre, barcode } = producto.producto;
        const valor = producto.valor;
        const promocion = producto.tiendaPromocion;
        const valor_promocion = promocion ? valor - (valor * promocion.porcentaje / 100) : valor;

        return {
          nombre,
          barcode,
          valor,
          promocion: promocion ? {
            id_promocion: promocion.id_promocion,
            porcentaje: promocion.porcentaje,
            valor_promocion,
          } : null,
        };
      });

      res.status(200).json(productosFormateados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default TiendasPController;
