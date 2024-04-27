import Maquina from "../models/maquinas.js"

const helpersMaquinas = {
    validarCodigoUnico: async (codigo)=>{
        const existe = await Maquina.findOne({codigo})
        if(existe){
            throw new Error('El Codigo de la maquina ya ha sido registrado')
        }
    },
    validarExistenciaId: async (id)=>{
        const existe = await  Maquina.findById(id);
        if(existe == undefined){
            throw new Error ('El id de la maquina no Existe')
        }
    }
}

export default helpersMaquinas