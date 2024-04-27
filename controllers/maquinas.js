import Maquina from "../models/maquinas.js";

const httpMaquinas = {
    getMaquinas: async (req, res)=>{
        const {busqueda} = req.query;
        const maquina = await  Maquina.find({
            $or:[{codigo: new RegExp(busqueda, "i")}]
        });
        res.json({maquina})
    },
    getMaquinaID: async (req, res) =>{
        const {id} = req.params;
        const maquinas  = await Maquina.findById(id) ;
        res.json({maquinas})
    },
    getMaquinaActivo: async (req,res) => {
        const maquinas = await Maquina.find({estado: 1})
        res.json({ maquinas })
    },
    getMaquinaInactivo: async (req,res) => {
        const maquinas = await Maquina.find({estado: 0})
        res.json({ maquinas })
    },
    postMaquinas:async (req, res) =>{
        try{
         const { idsede,codigo} = req.body;
         const maquina = new Maquina({idsede, codigo})
         await maquina.save();
         res.json({maquina})
        }catch(error){
            res.status(400).json({err: "No se pudo agregar la Maquina"})
        }
    },
    putMaquinas:async(req, res) =>{
        const {id} = req.params;
        const {idsede, ...resto} = req.body;
        const maquina = await Maquina.findByIdAndUpdate(id, {idsede,...resto}, {new: true})
        res.json({maquina})
    },
    putMaquinasActivar: async(req, res) =>{
        const {id} = req.params;
        const maquina = await Maquina.findByIdAndUpdate(id,{estado:1}, {new:true})
        res.json({maquina})
    },
    putMaquinasDesactivar: async(req, res) =>{
        const {id} = req.params;
        const maquina = await Maquina.findByIdAndUpdate(id,{estado:0}, {new:true})
        res.json({maquina})
    },

};

export default httpMaquinas