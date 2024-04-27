import Venta from "../models/ventas.js";

const helperVentas = {

    validarCodigoUnico: async (codigo) => {
        const existe = await Venta.findOne({ codigo })
        if (existe) {
            throw new Error('El codigo de la venta ya ha sido registrado')
        }
    },
    validarExistenciaID: async (id) => {
        const existe = await Venta.findById(id);
        if (existe == undefined) {
            throw new Error('El id no Existe')

        }
    }


}

export default helperVentas