/** @format */

const Address = require("../models/address");

module.exports = {
  findByUser(req, res) {
    const id_user = req.params.id_user;
    Address.findByUser(id_user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al obtener las direcciones",
          error: err,
        });
      }

      res.status(201).json(data);
    });
  },
  create(req, res) {
    const address = req.body;
    Address.create(address, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro de la direccion",
          error: err,
        });
      }

      res.status(201).json({
        success: true,
        message: "La direccion se creo correctamente",
        data: `${id}`, // EL ID DE LA NUEVA CATEGORIA QUE SE REGISTRO
      });
    });
  },
};
