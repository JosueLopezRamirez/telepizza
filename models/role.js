/** @format */

const db = require("../config/config");

const Rol = {};

Rol.create = (id_user, id_role, result) => {
  const sql = `
        insert into
            user_has_roles(
                id_user,
                id_role,
                created_at,
                updated_at
            )
            values(?,?,?,?)
    `;

  db.query(sql, [id_user, id_role, new Date(), new Date()], (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
    } else {
      console.log("Rol asignado:", res.insertId);
      result(null, res.insertId);
    }
  });
};

module.exports = Rol;
