import mongoose from 'mongoose'

const productoSchema = new mongoose.Schema({
    nombre: { type: String, require: true },
    codigo: {type: String, require: true, unique: true},
    valor: { type: Number, require: true },
    cantidad: { type: Number, require: true },
    estado: { type: Number, default: 1 },
})

export default mongoose.model('Producto', productoSchema)