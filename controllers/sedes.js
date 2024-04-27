import Sede from "../models/sedes.js"

const httpSedes = {
    getSedes: async (req, res)=>{
        const {busqueda} = req.query;
        const sede = await Sede.find({
            $or:[{nombre: new RegExp(busqueda, "i") }]
        });
        res.json({sede})
    },
    getSedesID: async (req, res)=>{
        const {id} = req.params;
        const sedes = await Sede.findById(id);
        res.json({sedes})
    }, 
    getSedesActivo: async (req,res) => {
        const sede = await Sede.find({estado: 1})
        res.json({ sede })
    },
    getSedesInactivo: async (req,res) => {
        const sede = await Sede.find({estado: 0})
        res.json({ sede })
    },
    postSede: async(req, res)=>{
        try{
            const {nombre,dirrecion,codigo, horario,ciudad,telefono } = req.body;
            const sede = new Sede({nombre,dirrecion,codigo, horario,ciudad,telefono})
            await sede.save();
            res.json([sede])
        }catch (error){
            res.status(400).json({err: "No se puede agregar la sede"})
        }
    },
    putSede: async(req, res)=>{
        const {id} = req.params;
        const {nombre,dirrecion,codigo, ...resto } = req.body;
        const sede = await Sede.findByIdAndUpdate(id, { nombre, ...resto }, { new: true })
        res.json({sede})
    },
    putSedeActivar: async(req, res)=>{
        const {id} = req.params;
        const sede = await Sede.findByIdAndUpdate(
            id,{estado: 1},
            {new: true}
        );
        res.json({sede})
    },
    putSedeDesactivar: async(req, res)=>{
        const {id} = req.params;
        const sede = await Sede.findByIdAndUpdate(
            id,{estado: 0},
            {new: true}
        );
        res.json({sede})
    },

};

export default httpSedes