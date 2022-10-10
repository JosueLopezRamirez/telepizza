/** @format */

const Order = require("../models/order");
const OrdersHasProduct = require("../models/order_has_products");

module.exports = {
  async createPayment(req, res) {
    let payment = req.body;
    console.log("Payment: ", payment);

    const payment_data = {
      issuer_id: payment.issuer_id,
      payment_method_id: payment.payment_method_id,
      transaction_amount: payment.transaction_amount,
      installments: 1,
      payer: {
        email: payment.payer.email
      }
    };
  }
};
