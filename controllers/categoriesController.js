/** @format */

const Category = require("../models/category");

module.exports = {
  create(req, res) {
    const category = req.body;
    console.log("cat: ", category);
    Category.create(category, (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro de la categoria",
          error: err
        });
      }

      res.status(201).json({
        success: true,
        message: "La categoria se creo correctamente",
        data: `${id}` // EL ID DE LA NUEVA CATEGORIA QUE SE REGISTRO
      });
    });
  },
  getAllCategories(req, res) {
    Category.getAll((err, resdata) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al obtener las categorias",
          error: err
        });
      }

      res.status(201).json(resdata);
    });
  }
};
