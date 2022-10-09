/** @format */

const db = require("../config/config");

const Order = {};

Order.findByClientAndStatus = (id_client, status, result) => {
  const sql = `
      select
      CONVERT(O.id,char) as id,
      CONVERT(O.id_client,char) as id_client,
      CONVERT(O.id_address,char) as id_address,
      CONVERT(O.id_delivery,char) as id_delivery,
      O.status,
      O.timestamp,
      O.lat,
      O.lng,
        json_object(
            "id",CONVERT(A.id,char),
            "address",A.address,
            "neighborhood",A.neighborhood,
            "lat",A.lat,
            "lng",A.lng
        ) as address,
        json_object(
        "id",CONVERT(U.id,char),  
            "name",U.name,
            "lastname",U.lastname,
            "image",U.image,
            "phone",U.phone
        ) as client,
        json_object(
        "id",CONVERT(U2.id,char),  
            "name",U2.name,
            "lastname",U2.lastname,
            "image",U2.image,
            "phone",U2.phone
        ) as delivery,
        json_arrayagg(
        json_object(
            "id",CONVERT(P.id,char),
            "name",P.name,
            "description",P.description,
            "price", P.price,
            "image1",P.image1,
            "image2", P.image2,
            "image3", P.image3,
            "quantity", OHP.quantity
        )
      ) as products
    from 
      orders as O
    inner join 
      users as U
    on
      U.id = O.id_client
    left join
      users as U2
    on
    U2.id = O.id_delivery
    inner join
      address as A
    on 
      A.id = O.id_address
    inner join 
      order_has_produccts as OHP
    on
      OHP.id_order = O.id
    inner join 
      products as P
    on 
      P.id = OHP.id_product
    where
    O.id_client = ? and O.status = ?
    group by 
      O.id
    order by 
      O.timestamp;  
  `;

  db.query(sql, [id_client, status], (err, data) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
    } else {
      result(null, data);
    }
  });
};
Order.findByDeliveryAndStatus = (id_delivery, status, result) => {
  const sql = `
      select
      CONVERT(O.id,char) as id,
      CONVERT(O.id_client,char) as id_client,
      CONVERT(O.id_address,char) as id_address,
      CONVERT(O.id_delivery,char) as id_delivery,
      O.status,
      O.timestamp,
      O.lat,
      O.lng,
        json_object(
            "id",CONVERT(A.id,char),
            "address",A.address,
            "neighborhood",A.neighborhood,
            "lat",A.lat,
            "lng",A.lng
        ) as address,
        json_object(
        "id",CONVERT(U.id,char),  
            "name",U.name,
            "lastname",U.lastname,
            "image",U.image,
            "phone",U.phone
        ) as client,
        json_object(
        "id",CONVERT(U2.id,char),  
            "name",U2.name,
            "lastname",U2.lastname,
            "image",U2.image,
            "phone",U2.phone
        ) as delivery,
        json_arrayagg(
        json_object(
            "id",CONVERT(P.id,char),
            "name",P.name,
            "description",P.description,
            "price", P.price,
            "image1",P.image1,
            "image2", P.image2,
            "image3", P.image3,
            "quantity", OHP.quantity
        )
      ) as products
    from 
      orders as O
    inner join 
      users as U
    on
      U.id = O.id_client
    left join
      users as U2
    on
    U2.id = O.id_delivery
    inner join
      address as A
    on 
      A.id = O.id_address
    inner join 
      order_has_produccts as OHP
    on
      OHP.id_order = O.id
    inner join 
      products as P
    on 
      P.id = OHP.id_product
    where
    O.id_delivery = ? and O.status = ?
    group by 
      O.id
    order by 
      O.timestamp;  
  `;

  db.query(sql, [id_delivery, status], (err, data) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
    } else {
      result(null, data);
    }
  });
};

Order.findByStatus = (status, result) => {
  const sql = `
        select
        CONVERT(O.id,char) as id,
        CONVERT(O.id_client,char) as id_client,
        CONVERT(O.id_address,char) as id_address,
        CONVERT(O.id_delivery,char) as id_delivery,
        O.status,
        O.timestamp,
        O.lat,
        O.lng,
          json_object(
              "id",CONVERT(A.id,char),
              "address",A.address,
              "neighborhood",A.neighborhood,
              "lat",A.lat,
              "lng",A.lng
          ) as address,
          json_object(
          "id",CONVERT(U.id,char),  
              "name",U.name,
              "lastname",U.lastname,
              "image",U.image,
              "phone",U.phone
          ) as client,
          json_object(
          "id",CONVERT(U2.id,char),  
              "name",U2.name,
              "lastname",U2.lastname,
              "image",U2.image,
              "phone",U2.phone
          ) as delivery,
          json_arrayagg(
          json_object(
              "id",CONVERT(P.id,char),
              "name",P.name,
              "description",P.description,
              "price", P.price,
              "image1",P.image1,
              "image2", P.image2,
              "image3", P.image3,
              "quantity", OHP.quantity
          )
        ) as products
      from 
        orders as O
      inner join 
        users as U
      on
        U.id = O.id_client
      left join
        users as U2
      on
      U2.id = O.id_delivery
      inner join
        address as A
      on 
        A.id = O.id_address
      inner join 
        order_has_produccts as OHP
      on
        OHP.id_order = O.id
      inner join 
        products as P
      on 
        P.id = OHP.id_product
      where
        status = ?
      group by 
        O.id
      order by 
        O.timestamp;  
  `;

  db.query(sql, status, (err, data) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
    } else {
      result(null, data);
    }
  });
};

Order.create = (order, result) => {
  const sql = `
    INSERT INTO
        orders(
          id_client,
          id_address,
          status,
          timestamp,
          created_at,
          updated_at
        )
    VALUES(?,?,?,?,?,?)`;

  db.query(
    sql,
    [
      order.id_client,
      order.id_address,
      "PAGADO", // 1- PAGADO 2- DESPACHADO 3- EN CAMINO 4- ENTREGADO
      Date.now(),
      new Date(),
      new Date()
    ],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Id de la nueva orden: ", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

Order.updateToDispached = (id_order, id_delivery, result) => {
  const sql = `
  UPDATE
      orders
  SET
      id_delivery = ?,
      status = ?,
      updated_at = ?
  WHERE
      id = ?`;

  db.query(
    sql,
    [
      id_delivery,
      "DESPACHADO", // 1- PAGADO 2- DESPACHADO 3- EN CAMINO 4- ENTREGADO
      new Date(),
      id_order
    ],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        result(null, id_order);
      }
    }
  );
};

Order.updateToOnTheWay = (id_order, result) => {
  const sql = `
  UPDATE
      orders
  SET
      status = ?,
      updated_at = ?
  WHERE
      id = ?`;

  db.query(
    sql,
    [
      "EN CAMINO", // 1- PAGADO 2- DESPACHADO 3- EN CAMINO 4- ENTREGADO
      new Date(),
      id_order
    ],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        result(null, id_order);
      }
    }
  );
};

Order.updateLatLng = (order, result) => {
  const sql = `
  UPDATE
      orders
  SET
      lat = ?,
      lng = ?,
      updated_at = ?
  WHERE
      id = ?`;

  db.query(
    sql,
    [
      order.lat,
      order.lng, // 1- PAGADO 2- DESPACHADO 3- EN CAMINO 4- ENTREGADO
      new Date(),
      order.id
    ],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Order: ", res);
        result(null, order.id);
      }
    }
  );
};

Order.updateToDelivered = (id_order, result) => {
  const sql = `
  UPDATE
      orders
  SET
      status = ?,
      updated_at = ?
  WHERE
      id = ?`;

  db.query(
    sql,
    [
      "ENTREGADO", // 1- PAGADO 2- DESPACHADO 3- EN CAMINO 4- ENTREGADO
      new Date(),
      id_order
    ],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        result(null, id_order);
      }
    }
  );
};

module.exports = Order;
