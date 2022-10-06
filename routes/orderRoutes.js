/** @format */

const ordersController = require("../controllers/ordersController");
const passport = require("passport");
module.exports = (app) => {
  // GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  // PUT -> ACTUALIZAR DATOS
  // DELETE -> ELIMINAR DATOS
  app.post(
    "/api/orders/create",
    passport.authenticate("jwt", { session: false }),
    ordersController.create
  );
  app.get(
    "/api/orders/findByStatus/:status",
    passport.authenticate("jwt", { session: false }),
    ordersController.findByStatus
  );
  app.get(
    "/api/orders/findByDeliveryAndStatus/:id_delivery/:status",
    passport.authenticate("jwt", { session: false }),
    ordersController.findByDeliveryAndStatus
  );
  app.post(
    "/api/orders/updateToDispached",
    passport.authenticate("jwt", { session: false }),
    ordersController.updateToDispached
  );
  app.post(
    "/api/orders/updateToOnTheWay",
    passport.authenticate("jwt", { session: false }),
    ordersController.updateToOnTheWay
  );
};
