import { Request, Response } from 'express'
import { check, validationResult, param } from 'express-validator'
import Producto from '../models/Producto.model';
import { handleErroresInput } from '../middleware';


// Obtener todos los productos
export const obtenerProductos = async (req: Request, res: Response) => {
  try {
    const productos = await Producto.findAll({
      order: [
        ['id', 'ASC']
      ]
      // quitar algunos campos
      // attributes: {exclude: ['updatedAt']}
    })
    res.json({ data: productos })
  } catch (error) {
    console.log(error);
  }
}

// Obtener un producto por su id
export const obtenerProductoById = async (req: Request, res: Response) => {

  try {
    const { id } = req.params
    const producto = await Producto.findByPk(id)
    if (!producto) {
      res.status(404).json({
        error: 'Producto no Encontrado!'
      })
    }
    res.json({ data: producto })
  } catch (error) {
    console.log(error);
  }
}

// Crear un producto
export const crearProducto = async (req: Request, res: Response) => {

  try {
    // Validacion
    await check('name').notEmpty().withMessage('El nombre del producto, no puede ir vacio').run(req)
    await check('price')
      .isNumeric().withMessage('Valor no valido')
      .custom(value => value > 0).withMessage('Precio no valido')
      .notEmpty().withMessage('El precio, no puede ir vacio')
      .run(req)
    handleErroresInput
    const producto = await Producto.create(req.body)
    res.json({ data: producto })
  } catch (error) {
    console.log(error);

  }


}

// Actualizar un producto
export const actualizarProductos = async (req: Request, res: Response) => {
  try {
    // Verificar si existe el producto
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({
        error: 'El producto no existe',
      });
    }

    // Validación
    await param('id').isInt().withMessage('ID NO VALIDO'),
      await check('name').notEmpty().withMessage('El nombre del producto no puede ir vacío').run(req);
    await check('price')
      .isNumeric().withMessage('Valor no válido')
      .custom((value) => value > 0).withMessage('Precio no válido')
      .notEmpty().withMessage('El precio no puede ir vacío')
      .run(req);
    await check('disponibilidad').isBoolean().withMessage('Valor para disponibilidad no válido').run(req);


    // Actualizar el producto
    await producto.update(req.body);

    // Enviar respuesta con el producto actualizado
    return res.json({ data: producto });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
};


export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params
  const producto = await Producto.findByPk(id)

  if(!producto) {
      return res.status(404).json({
          error: 'Producto No Encontrado'
      })
  }
  
  // Actualizar
  producto.disponibilidad = !producto.dataValues.disponibilidad
  await producto.save()
  res.json({data: producto})
}

// Eliminar un producto
export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    // Verificar si existe el producto
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({
        error: 'El producto no existe',
      });
    }

    // Elimina el producto
    await producto.destroy()
    return res.json({
      message: 'Producto eliminado correctamente'
    })

    res.json({ data: producto })
  } catch (error) {
    console.log(error);
  }
}