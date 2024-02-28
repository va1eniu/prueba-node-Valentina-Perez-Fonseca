import TiendasProductos from '../models/Tiendas_Productos.js';
import Productos from '../models/Productos.js';
import Promocion from '../models/promociones.js';
import TiendasPromocion from '../models/Tiendas_promociones.js'; // Asegúrate de tener este modelo

const TiendasPController = {
  // Método para obtener productos de una tienda con descuentos de Promocion
  getProductosByTienda: async (req, res) => {
    const { id_tienda } = req.params;

    try {
      // Obtener productos de la tienda utilizando la relación
      const productos = await TiendasProductos.findAll({
        where: { id_tienda },
        include: [
          {
            model: Productos,
            attributes: ['id_producto', 'nombre', 'presentacion', 'barcode'],
          },
          {
            model: Promocion,
            required: false, // Left join con Promocion
            attributes: ['id_promocion', 'nombre', 'porcentaje'],
            through: { attributes: [] }, // Evitar traer datos de la tabla intermedia
            include: [
              {
                model: TiendasPromocion,
                required: true, // Inner join con TiendasPromocion
                where: {
                  id_tienda,
                  estado: 1, // Promoción activa
                  inicio: { [Op.lte]: new Date() }, // Fecha de inicio menor o igual a hoy
                  fin: { [Op.gte]: new Date() }, // Fecha de fin mayor o igual a hoy
                },
                attributes: [], // Evitar traer datos adicionales de TiendasPromocion
              },
            ],
          },
        ],
      });

      // Formatear los productos
      const productosFormateados = productos.map(producto => {
        const { id_producto, nombre, presentacion, barcode, valor } = producto.Producto;
        const promocion = producto.Promocione; // Puede ser null si no hay promoción

        // Calcular el valor con descuento si hay promoción
        const valorConDescuento = promocion ? valor - (valor * promocion.porcentaje / 100) : valor;

        return {
          id_producto,
          nombre,
          presentacion,
          barcode,
          valor,
          promocion: promocion ? {
            id_promocion: promocion.id_promocion,
            nombre: promocion.nombre,
            porcentaje: promocion.porcentaje,
            valor_promocion: valorConDescuento,
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
