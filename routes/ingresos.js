import {Router} from 'express'
import httpIngresos from '../controllers/ingresos.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersIngresos from '../helpers/ingresos.js'


const router = Router()

router.get('/', httpIngresos.getIngresos)
router.get('/sede', httpIngresos.getIngresoSede)
router.get('/listar/:id', httpIngresos.getIngresosID)
router.get('/activos', httpIngresos.getIngresoActivo)
router.get('/inactivos', httpIngresos.getIngresoInactivo)

router.post('/',[
  check('idsede', "El idsede no puede estar vacio").notEmpty(),
  check('idcliente', "El idsede no puede estar vacio").notEmpty(),
  check('codigo', "El codigo no puede estar vacio").notEmpty(),
  check('codigo').custom(helpersIngresos.validarCodigoUnico),
  validarCampos
], httpIngresos.postIngresos)

router.put('/:id',[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersIngresos.validarCodigoUnico),
  validarCampos 
], httpIngresos.putIngresos)

router.put('/activar/:id',[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersIngresos.validarCodigoUnico),
  validarCampos 
], httpIngresos.putIngresosActivar)

router.put('/desactivar/:id',[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersIngresos.validarCodigoUnico),
  validarCampos 
], httpIngresos.putIngresosDesactivar)

export default router 