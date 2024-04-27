import {Router} from 'express'
import httpPlanes from '../controllers/planes.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersPlan from '../helpers/planes.js'

const router =Router()

router.get('/', httpPlanes.getPlanes)
router.get('/listar/:id', httpPlanes.getPlanesID)
router.get('/activos', httpPlanes.getPlanesActivo)
router.get('/inactivos', httpPlanes.getPlanesInactivo)

router.post('/',[
  check('codigo', "El codigo no puede estar vacio").notEmpty(),
  check('codigo').custom(helpersPlan.validarCodigoUnico),
  check('descripcion', "La descripcion no puede estar vacio").notEmpty(),
  check('valor', "El valor no puede estar vacio").notEmpty(),
  check('dias', "Los dias no pueden estar vacio").notEmpty(),
  validarCampos
], httpPlanes.postPlanes)

router.put('/:id',[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersPlan.validarExistaUsuarioId),
  validarCampos
], httpPlanes.putPlanes)

router.put('/activar/:id',[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersPlan.validarExistaUsuarioId),
  validarCampos
], httpPlanes.putPlanesActivar)

router.put('/desactivar/:id',[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersPlan.validarExistaUsuarioId),
  validarCampos
], httpPlanes.putPlanesDesactivar)

export default router
