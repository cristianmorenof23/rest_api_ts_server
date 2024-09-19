import { Router } from 'express'
import { actualizarProductos, crearProducto, eliminarProducto, obtenerProductoById, obtenerProductos, updateAvailability } from './handlers/producto'
import { param } from 'express-validator'
import { handleErroresInput } from './middleware'

const router = Router()

// routing
router.get('/', obtenerProductos)
router.get('/:id',
  param('id').isInt().withMessage('ID NO VALIDO'),
  handleErroresInput,
  obtenerProductoById
)

router.post('/', crearProducto)

// editar productos
router.put('/:id',
  param('id').isInt().withMessage('ID NO VALIDO'),
  handleErroresInput,
  actualizarProductos)

// eliminar producto
router.delete('/:id',
  param('id').isInt().withMessage('ID NO VALIDO'),
  handleErroresInput,
  eliminarProducto)


router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleErroresInput,
    updateAvailability
)


export default router