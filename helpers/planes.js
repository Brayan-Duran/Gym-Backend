import Planes from "../models/planes.js";

const helpersPlan = {
  validarCodigoUnico: async (codigo) => {
    const existe = await Planes.findOne({ codigo });
    if (existe) {
      throw new Error("Este codigo ya existe");
    }
  },
  validarExistaUsuarioId: async (id) => {
    const existe = await Planes.findById(id);
    if (existe == undefined) {
      throw new Error("Id no existe");
    }
  },
}

export default helpersPlan; 