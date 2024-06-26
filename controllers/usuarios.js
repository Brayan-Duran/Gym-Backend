import Usuario from "../models/usuarios.js";
import { generarJWT } from "../middleware/validar-jwt.js";
import bcryptjs from "bcryptjs"

const httpUsuarios = {
  getUsuarios: async (req, res) => {
    const { busqueda } = req.query;
    const usuarios = await Usuario.find({
      $or: [{ nombre: new RegExp(busqueda, "i") }],
    });
    res.json({ usuarios }); 
  },
  getUsuariosID: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.json({ usuario });
  },
  getUsuariosActivo: async (req,res) => {
    const usuarios = await Usuario.find({estado: 1})
    res.json({ usuarios })
  },
  getUsuariosInactivo: async (req,res) => {
    const usuarios = await Usuario.find({estado: 0})
    res.json({ usuarios })
  },
  postUsuarios: async (req, res) => {
    try {
      const { idsede,nombre, direccion, codigo, horario, ciudad, telefono, correo, password, estado } = req.body;
      const salt = bcryptjs.genSaltSync(10)
      const usuarios = new Usuario({ idsede,nombre, direccion, codigo, horario, ciudad, telefono, correo, password, estado });
      usuarios.password = bcryptjs.hashSync(password, salt)
      await usuarios.save();
      res.json({ usuarios });
    } catch (error) {
      res.status(400).json({ err: "No se pudo crear el usuario" });
    }
  },
  putUsuarios: async (req, res) => {
    const { id } = req.params;
    const {  direccion, codigo, horario, ciudad, telefono, correo, password, estado, ...resto} = req.body;
    const usuarios = await Usuario.findByIdAndUpdate(id, resto, {new: true});
    res.json({ usuarios })
  },
  putUsuariosActivar: async (req,res) =>{
    const { id } = req.params;
    const usuarios = await Usuario.findByIdAndUpdate(id, {estado: 1}, {new: true});
    res.json({ usuarios });
  },
  putUsuariosDesactivar: async (req,res) =>{
    const { id } = req.params;
    const usuarios = await Usuario.findByIdAndUpdate(id, {estado: 0}, {new: true});
    res.json({ usuarios });
  },
  login: async (req, res) =>{
    const {correo, password}= req.body;
    try{
      const user = await Usuario.findOne({correo})

      if(!user){
        return res.status(401).json({
          msg: "Usuario/Contraseña no son  correctos"
        })
      }

      if(user.estado === 0){
        return res.status(401).json({
          msg: "Usuario/Contraseña no son  correctos"
        })
      }

      const validPassword = bcryptjs.compareSync(password,user.password);
      if(!validPassword){
        return res.status(401).json({
          msg: "Usuario/Contraseña no son  correctos"
        })
      }

      const token = await generarJWT(user._id);
      res.json({
        usuario: user,
        token
      })

    }catch (error){
      return res.status(500).json({
        msg: "Hable con el Administrador"
      })
    }
  }
}

export default httpUsuarios;