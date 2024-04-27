import Planes from "../models/planes.js";

const httpPlanes = {
  getPlanes: async (req, res) => {
    const { busqueda } = req.query;
    const planes = await Planes.find({
      $or: [{ codigo: new RegExp(busqueda, "i") }],
    });
    res.json({ planes }); 
  },
  getPlanesID: async (req, res) => {
    const { id } = req.params;
    const planes = await Planes.findById(id);
    res.json({ planes });
  },
  getPlanesActivo: async (req,res) => {
    const planes = await Planes.find({estado: 1})
    res.json({ planes })
  },
  getPlanesInactivo: async (req,res) => {
    const planes = await Planes.find({estado: 0})
    res.json({ planes })
  },
  postPlanes: async (req, res) => {
    try {
      const { codigo,descripcion,valor,dias } = req.body;
      const planes = new Planes({ codigo,descripcion,valor,dias });
      await planes.save();
      res.json({ planes });
    } catch (error) {
      res.status(400).json({ err: "No se pudo crear el Plan" });
    }
  },
  putPlanes: async (req, res) => {
    const { id } = req.params;
    const {  codigo, valor, dias, estado, ...resto} = req.body;
    const planes = await Planes.findByIdAndUpdate(id, resto, {new: true});
    res.json({ planes })
  },
  putPlanesActivar: async (req,res) =>{ 
    const { id } = req.params;
    const planes = await Planes.findByIdAndUpdate(id, {estado: 1}, {new: true});
    res.json({ planes });
  },
  putPlanesDesactivar: async (req,res) =>{
    const { id } = req.params;
    const planes = await Planes.findByIdAndUpdate(id, {estado: 0}, {new: true});
    res.json({ planes });
  },
}

export default httpPlanes;