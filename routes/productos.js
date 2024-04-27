import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import httpProductos from "../controllers/productos.js"
import helperProductos from "../helpers/productos.js"

const router = Router();
router.get('/', httpProductos.getProductos);
router.get('/listar/:id', httpProductos.getProductosID)
router.get('/activos', httpProductos.getProductosActivo)
router.get('/inactivos', httpProductos.getProductosInactivo)

router.post('/', [
    check('nombre', 'Se debe agregar un nombre').notEmpty(),
    check('codigo', 'Se debe agregar un codigo').notEmpty(),
    check('codigo').custom(helperProductos.validarCodigoUnico),
    check('valor', 'Se debe agregar un valor para el producto').notEmpty(),
    check('valor', 'El valor debe ser numero').isNumeric(),
    check('cantidad', 'Se debe agregar una cantidad para el producto').notEmpty(),
    check('cantidad', 'La cantidad debe ser numerica').isNumeric(),
    validarCampos
],httpProductos.postProductos)
router.put('/:id', [
    check('id', 'Se neceita un codigo de MongoId valido ').isMongoId(),
    check('id').custom(helperProductos.validarExistenciaId),
    validarCampos
], httpProductos.putProductos)
router.put('/activar/:id',  [
    check('id', 'Se neceita un codigo de MongoId valido ').isMongoId(),
    check('id').custom(helperProductos.validarExistenciaId),
    validarCampos
],httpProductos.putProductosActivar)
router.put('/desactivar/:id',  [
    check('id', 'Se neceita un codigo de MongoId valido ').isMongoId(),
    check('id').custom(helperProductos.validarExistenciaId),
    validarCampos
],httpProductos.putProductosDesactivar)


export default router