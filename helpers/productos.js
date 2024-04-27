import Producto from "../models/productos.js"

const helperProducto ={
     validarCodigoUnico: async (codigo)=>{
        const existe = await Producto.findOne({codigo})
        if(existe){
            throw new Error('El codigo del producto ya ha sido registrado')
        }
     },

     validarExistenciaId: async (id) =>{
        const existe = await Producto.findById(id);
        if(existe == undefined){
            throw new Error('El id del producto no existe')
        }
     }

}

export default helperProducto