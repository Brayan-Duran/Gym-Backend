import Producto from "../models/productos.js"

const httpProductos ={

    getProductos: async (req, res)=>{
       const {busqueda} = req.query;
       const producto = await Producto.find({
        $or:[{codigo: new RegExp(busqueda)}]
       });
       res.json({producto})
    },
    getProductosID: async (req, res) =>{
        const {id} = req.params;
        const productos = await Producto.findById(id);
        res.json({productos})
    },
    getProductosActivo: async (req,res) => {
        const productos = await Producto.find({estado: 1})
        res.json({ productos })
    },
    getProductosInactivo: async (req,res) => {
        const productos = await Producto.find({estado: 0})
        res.json({ productos })
    },
    postProductos: async (req, res)=>{
        try{
            const {nombre,codigo, valor, cantidad}= req.body;
            const producto = new Producto({nombre,codigo, valor, cantidad})
            await producto.save()
            res.json({producto})
        }catch (error){
            res.status(400).json({err: "No se puede registrar el producto"})
        }
    },
    putProductos: async (req, res)=>{
        const {id}= req.params;
        const {nombre,...resto} = req.body;
        const producto= await Producto.findByIdAndUpdate(id, {nombre,...resto}, {new: true})
        res.json({producto})
    },
    putProductosActivar: async (req, res) =>{
        const {id} = req.params;
        const producto = await Producto.findByIdAndUpdate(id, {estado: 1}, {new: true})
        res.json({producto})
    }, 
    putProductosDesactivar: async (req, res) =>{
        const {id} = req.params;
        const producto = await Producto.findByIdAndUpdate(id, {estado: 0}, {new: true})
        res.json({producto})
    }


}

export default httpProductos;