import {Router} from 'express'
import httpPagos from '../controllers/pagos.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersPago from '../helpers/pagos.js'

const router=Router()


router.get('/', httpPagos.getPagos)
router.get('/listar/:id', httpPagos.getPagosID)
router.get('/activos', httpPagos.getPagoActivo)
router.get('/inactivos', httpPagos.getPagoInactivo)
router.get('/pagosCliente/:idCliente', httpPagos.getPagosCliente)

router.post('/',[
    check('idCliente', "El id cliente no puede estar vacio").notEmpty(),
    check('idCliente', "El id no es valido").isMongoId(),
    validarCampos
], httpPagos.postPagos)

router.put('/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersPago.validarExistaPagoId),
    validarCampos 
], httpPagos.putPagos)

router.put('/activar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersPago.validarExistaPagoId),
    validarCampos 
], httpPagos.putActivarPagos)

router.put('/desactivar/:id',[
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersPago.validarExistaPagoId),
    validarCampos 
], httpPagos.putDesactivarPagos)

export default router




