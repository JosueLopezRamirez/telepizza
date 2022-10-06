/** @format */

const usersController = require("../controllers/usersController");
const passport = require("passport");
module.exports = (app, upload) => {
  // GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  // PUT -> ACTUALIZAR DATOS
  // DELETE -> ELIMINAR DATOS

  app.post("/api/users/create", usersController.register);
  app.post(
    "/api/users/createWithImage",
    upload.array("image", 1),
    usersController.registerWithImage
  );
  app.post("/api/users/login", usersController.login);
  // Ya logeado
  app.put(
    "/api/users/update",
    passport.authenticate("jwt", { session: false }),
    upload.array("image", 1),
    usersController.updateWithImage
  );
  app.put(
    "/api/users/updateWhitOutImage",
    passport.authenticate("jwt", { session: false }),
    usersController.updateWithOutImage
  );
  app.get(
    "/api/users/findDeliverymen",
    passport.authenticate("jwt", { session: false }),
    usersController.findDeliveryMen
  );
};
