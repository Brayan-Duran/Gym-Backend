import {Router} from 'express'
import httpClientes from '../controllers/clientes.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersCliente from '../helpers/clientes.js'

const router=Router()

router.get('/', httpClientes.getClientes)
router.get('/listar/:id', httpClientes.getClientesID)
router.get('/activos', httpClientes.getClienteActivo)
router.get('/inactivos', httpClientes.getClienteInactivo)
router.get('/plan/:id', httpClientes.getClientesPlan)

router.post('/',[
  check('nombre', "El nombre no puede estar vacio").notEmpty(),
  check('fechaNacimiento', "La fecha no puede estar vacia").notEmpty(),
  check('edad', "La edad no puede estar vacia").notEmpty(),
  check('documento', "El documento no puede estar vacio").notEmpty(),
  check('documento').custom(helpersCliente.validarDocumentoUnico),
  check('telefono', "El telefono no puede estar vacio").notEmpty(),
  check('idPlan', "el plan no puede estar vacio").notEmpty(),
  check('idPlan', "el plan no puede estar vacio").isMongoId(),
  check('foto', "La foto no puede estar vacio").notEmpty(),
  check('objetivo', "El objetivo no puede estar vacio").notEmpty(),
  check('observaciones', "La observaciones no pueden estar vacio").notEmpty(),
  validarCampos
], httpClientes.postClientes)

router.put('/:id',[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersCliente.validarExistaClienteId),
  validarCampos 
], httpClientes.putClientes)

router.put('/activar/:id',[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersCliente.validarExistaClienteId),
  validarCampos 
], httpClientes.putActivarClientes)

router.put('/desactivar/:id',[
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersCliente.validarExistaClienteId),
  validarCampos 
], httpClientes.putDesactivarClientes)

router.patch('/renovarP/:idC/:idP',[
  check('idC', "Se nesecita un mongoid valido").isMongoId(),
  check('idP', "Se nesecita un mongoid valido").isMongoId(),
  validarCampos
], httpClientes.patchRenovarPlan)


export default router