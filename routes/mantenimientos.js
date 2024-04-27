import { Router} from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import httpMantenimientos from "../controllers/mantenimientos.js"
import helperMantenimientos from "../helpers/mantenimientos.js";

const router =Router()
router.get('/', httpMantenimientos.getMantenimientos)
router.get('/listar/:id', httpMantenimientos.getMantenimientosID) 
router.get('/activos', httpMantenimientos.getMantenimientoActivo)
router.get('/inactivos', httpMantenimientos.getMantenimientoInactivo)
router.get('/valorf', httpMantenimientos.getMantenimientosValor)
router.get('/mantenimientoM/:id', httpMantenimientos.getMantenimientosMaquina)

router.post('/',[
    check('idMaquina', 'El id de la maquina no puede estar vacio').notEmpty(),
    check('descripcion', 'La descripcion no puede estar vacia').notEmpty(),
    check('responsable', 'El responsable no puede estar vacio').notEmpty(),
    check('precio', 'El precio no puede estar vacio').notEmpty(),
    check('precio', 'El precio debe ser un numero').isNumeric(),
    check('idMaquina', 'Se necesita el MongoId de la maquina').isMongoId(),
    validarCampos
], httpMantenimientos.postMantenimientos)
router.put('/:id',[
    check('id', 'Se necesita un codigo de MongoId valido').isMongoId(),
    check('id').custom(helperMantenimientos.validarExistenciaId),
    validarCampos
], httpMantenimientos.putMantenimientos)
router.put('/activar/:id',[
    check('id', 'Se necesita un codigo de MongoId valido').isMongoId(),
    check('id').custom(helperMantenimientos.validarExistenciaId),
    validarCampos
], httpMantenimientos.putMantenimientosActivar)
router.put('/desactivar/:id',[
    check('id', 'Se necesita un codigo de MongoId valido').isMongoId(),
    check('id').custom(helperMantenimientos.validarExistenciaId),
    validarCampos
], httpMantenimientos.putMantenimientosDesactivar)



export default router;