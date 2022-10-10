/** @format */

const Product = require("../models/product");
const storage = require("../utils/cloud_storage");
const asyncForEach = require("../utils/async_foreach");

module.exports = {
  findProducts(req, res) {
    const id_category = req.params.id_category;
    const name = req.params.name;

    Product.findByCategoryAndName(name, id_category, (err, resdata) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al obtener las categorias",
          error: err
        });
      }

      res.status(201).json(resdata);
    });
  },
  findByCategories(req, res) {
    const id_category = req.params.id_category;

    Product.findByCategory(id_category, (err, resdata) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al obtener las categorias",
          error: err
        });
      }

      res.status(201).json(resdata);
    });
  },
  async create(req, res) {
    const product = JSON.parse(req.body.product); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

    const files = req.files;
    let inserts = 0;

    if (files.length === 0) {
      return res.status(501).json({
        success: false,
        message: "Hubo un error no ha seleccionado imagenes",
        error: err
      });
    } else {
      Product.create(product, (err, data) => {
        if (err) {
          return res.status(501).json({
            success: false,
            message: "Hubo un error con el registro del producto",
            error: err
          });
        }

        product.id = data;

        const start = async () => {
          await asyncForEach(files, async (file) => {
            const path = `image_${Date.now()}`;
            const url = await storage(file, path);

            if (url != undefined && url != null) {
              if (inserts == 0) {
                product.image1 = url;
              } else if (inserts == 1) {
                product.image2 = url;
              } else if (inserts == 2) {
                product.image3 = url;
              }
            }

            console.log("EL producto con imagenes: ", product);

            await Product.update(product, (err, data) => {
              if (err) {
                return res.status(501).json({
                  success: false,
                  message: "Hubo un error con el registro del producto",
                  error: err
                });
              }
              inserts = inserts + 1;

              if (inserts == files.length) {
                return res.status(201).json({
                  success: true,
                  message: "El producto se creo correctamente",
                  data: data
                });
              }
            });
          });
        };

        start();
      });
    }
  }
};
