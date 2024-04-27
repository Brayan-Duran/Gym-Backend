import { Router } from "express";
import httpSedes from '../controllers/sedes.js'
import helperSedes from '../helpers/sedes.js'
import {validarCampos}  from '../middleware/validar-campos.js'
import { check } from "express-validator";

const router=Router() 
router.get('/',httpSedes.getSedes)
router.get('/listar/:id', httpSedes.getSedesID)
router.get('/activos', httpSedes.getSedesActivo)
router.get('/inactivos', httpSedes.getSedesInactivo)

router.post('/',[
    check('nombre', "El nombre no puede estar vacio").notEmpty(),
    check('dirrecion', "La dirrecion no puede quedar vacio").notEmpty(),
    check('codigo',"El codigo no puede estar vacio").notEmpty(),
    check('codigo').custom(helperSedes.validarExistaCodigo),
    check('horario', "El horario no debe estar vacio").notEmpty(),
    check('ciudad', "La parte de ciudad no debe estar vacio").notEmpty(),
    check('telefono', "El telefono no puede estar vacio").notEmpty(),
    validarCampos
], httpSedes.postSede)
router.put('/:id',[
    check('id', "Se necesita un mongoid Valido").isMongoId(),
    check('id').custom(helperSedes.validarExistaCodigo),
    validarCampos
],httpSedes.putSede)
router.put('/activar/:id',[
    check('id', "Se necesita un mongoid Valido").isMongoId(),
    check('id').custom(helperSedes.validarExistaCodigo),
    validarCampos
],httpSedes.putSedeActivar)
router.put('/desactivar/:id',[
    check('id', "Se necesita un mongoid Valido").isMongoId(),
    check('id').custom(helperSedes.validarExistaSedeId),
    validarCampos
],httpSedes.putSedeDesactivar)

export default router