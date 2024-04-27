import Sede from "../models/sedes.js"

const helperSede ={
    validarExistaCodigo: async (codigo)=> {
        const existe = await Sede.findOne({codigo})
        if(existe){
            throw new Error ('El codigo ya esta registrado')
        }
    },
    validarExistaSedeId:async (id)=>{
        const existe = await Sede.findById(id)
        if(existe==undefined){
            throw new Error ('La id de la sede no Existe')
        }
    }
}

export default helperSede