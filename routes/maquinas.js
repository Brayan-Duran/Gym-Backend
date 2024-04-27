import { Router} from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import httpMaquinas from '../controllers/maquinas.js';
import helpersMaquinas from '../helpers/maquinas.js'

const router= Router();

router.get('/', httpMaquinas.getMaquinas);
router.get('/listar/:id', httpMaquinas.getMaquinaID)
router.get('/activos', httpMaquinas.getMaquinaActivo)
router.get('/inactivos', httpMaquinas.getMaquinaInactivo)

router.post('/',[
    check('idsede', 'La id de la sede no puede estar vacia').notEmpty(),
    check('idsede', 'se necesita el Mongoid de Sede valido').isMongoId(),
    check('codigo', 'El codigo no puede estar vacio').notEmpty(),
    check('codigo').custom(helpersMaquinas.validarCodigoUnico),
    validarCampos
], httpMaquinas.postMaquinas)
router.put('/:id',[
    check('id', 'Se necesita un codigo de MongoId valido').isMongoId(),
    check('id').custom(helpersMaquinas.validarExistenciaId),
    validarCampos
],httpMaquinas.putMaquinas)
router.put('/activar/:id',[
    check('id', 'Se necesita un codigo de MongoId valido').isMongoId(),
    check('id').custom(helpersMaquinas.validarExistenciaId),
    validarCampos
], httpMaquinas.putMaquinasActivar)
router.put('/desactivar/:id',[
    check('id', 'Se necesita un codigo de MongoId valido').isMongoId(),
    check('id').custom(helpersMaquinas.validarExistenciaId),
    validarCampos
], httpMaquinas.putMaquinasDesactivar)



export default router