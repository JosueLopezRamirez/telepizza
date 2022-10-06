/** @format */

const db = require("../config/config");

const OrderHasProducts = {};

OrderHasProducts.create = (id_order, id_prodcut, quantity, result) => {
  const sql = `
    INSERT INTO
        order_has_produccts(
          id_order,
          id_product,
          quantity,
          created_at,
          updated_at
        )
    VALUES(?,?,?,?,?)`;

  db.query(
    sql,
    [id_order, id_prodcut, quantity, new Date(), new Date()],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Id de la nueva orden con productos: ", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

module.exports = OrderHasProducts;
