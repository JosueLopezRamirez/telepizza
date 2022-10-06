/** @format */

const addressController = require("../controllers/addressController");
const passport = require("passport");
module.exports = (app) => {
  // GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  // PUT -> ACTUALIZAR DATOS
  // DELETE -> ELIMINAR DATOS
  app.post(
    "/api/address/create",
    passport.authenticate("jwt", { session: false }),
    addressController.create
  );

  app.get(
    "/api/address/findByuser/:id_user",
    passport.authenticate("jwt", { session: false }),
    addressController.findByUser
  );
};
