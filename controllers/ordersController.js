/** @format */

const Order = require("../models/order");
const OrdersHasProduct = require("../models/order_has_products");

module.exports = {
  findByStatus(req, res) {
    const status = req.params.status;

    Order.findByStatus(status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las ordenes",
          error: err
        });
      }

      for (const d of data) {
        d.address = JSON.parse(d.address);
        d.client = JSON.parse(d.client);
        d.products = JSON.parse(d.products);
      }

      res.status(201).json(data);
    });
  },
  findByDeliveryAndStatus(req, res) {
    const status = req.params.status;
    const id_delivery = req.params.id_delivery;

    Order.findByDeliveryAndStatus(id_delivery, status, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las ordenes",
          error: err
        });
      }

      for (const d of data) {
        d.address = JSON.parse(d.address);
        d.client = JSON.parse(d.client);
        d.products = JSON.parse(d.products);
        d.delivery = JSON.parse(d.delivery);
      }

      res.status(201).json(data);
    });
  },
  async create(req, res) {
    const order = req.body;

    Order.create(order, async (err, id) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro de la orden",
          error: err
        });
      }

      for (const products of order.products) {
        await OrdersHasProduct.create(
          id,
          products.id,
          products.quantity,
          (err, id_data) => {
            if (err) {
              return res.status(501).json({
                success: false,
                message:
                  "Hubo un error con la creacion de los productos en la orden",
                error: err
              });
            }
          }
        );
      }

      res.status(201).json({
        success: true,
        message: "La orden se creo correctamente",
        data: `${id}` // EL ID DE LA NUEVA CATEGORIA QUE SE REGISTRO
      });
    });
  },
  updateToDispached(req, res) {
    const order = req.body;

    Order.updateToDispached(order.id, order.id_delivery, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de actualizar la orden",
          error: err
        });
      }

      res.status(201).json({
        success: true,
        message: "La orden se ha actualizado correctamente",
        data: `${id_order}` // EL ID DE LA NUEVA CATEGORIA QUE SE REGISTRO
      });
    });
  },
  updateToOnTheWay(req, res) {
    const order = req.body;

    Order.updateToOnTheWay(order.id, (err, id_order) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de actualizar la orden",
          error: err
        });
      }

      res.status(201).json({
        success: true,
        message: "La orden se ha actualizado correctamente",
        data: `${id_order}` // EL ID DE LA NUEVA CATEGORIA QUE SE REGISTRO
      });
    });
  }
};
