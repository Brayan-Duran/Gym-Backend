import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import helperVentas from "../helpers/ventas.js"
import httpVentas from "../controllers/ventas.js";


const router= Router()
router.get('/', httpVentas.getVenta)
router.get('/listar/:id', httpVentas.getVentaID)
router.get('/activos', httpVentas.getVentaActivo)
router.get('/inactivos', httpVentas.getVentaInactivo)



router.post('/', [
    check('idProducto', ' Se necesita el id del producto').notEmpty(),
    check('idProducto', ' Se necesita un MongoId valido').isMongoId(),
    check('codigo', ' Se necesita un codigo').notEmpty(),
    check('codigo').custom(helperVentas.validarCodigoUnico),
    check('valorUnitario', ' Se necesita un valor unitario').notEmpty(),
    check('valorUnitario', ' El valor unitario debe ser numerico').isNumeric(),
    check('cantidad', ' Se necesita una cantidad').notEmpty(),
    check('cantidad', ' La cantidad debe ser numerica').isNumeric(),  
    validarCampos
], httpVentas.postVenta)
router.put('/:id',[ 
    check('id', "Se necesita un MongoId que sea valido").isMongoId(),
    check('id').custom(helperVentas.validarExistenciaID),
    validarCampos
], httpVentas.putVentas)
router.put('/activar/:id',[
    check('id', "Se necesita un MongoId que sea valido").isMongoId(),
    check('id').custom(helperVentas.validarExistenciaID),
    validarCampos
     ], httpVentas.putVentasActivar)
router.put('/desactivar/:id',[
    check('id', "Se necesita un MongoId que sea valido").isMongoId(),
    check('id').custom(helperVentas.validarExistenciaID),
    validarCampos
], httpVentas.putVentasDesactivar)

export default router