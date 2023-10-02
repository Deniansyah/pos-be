const response = require("../helpers/response");
const {
  selectAllDetailTransaction,
  insertDetailTransaction,
  changeDetailTransaction,
  dropDetailTransaction,
  selectDetailTransaction,
} = require("../models/detailTransaction.model");

exports.readAllDetailTransaction = (req, res) => {
  try {
    selectAllDetailTransaction((error, data) => {
      return res.status(200).json({
        status: true,
        message: "Lists data of detail transaction",
        results: data.rows,
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.createDetailTransaction = (req, res) => {
  const payload = {
    transaction_id: req.body.transaction_id,
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    qty: req.body.qty,
  };

  try {
    insertDetailTransaction(payload, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Detail transaction add successfully",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.updateDetailTransaction = (req, res) => {
  const payload = {
    transaction_id: req.body.transaction_id,
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    qty: req.body.qty,
  };

  try {
    changeDetailTransaction(req.params.id, payload, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Updated data detail transaction is success",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.deleteDetailTransaction = (req, res) => {
  dropDetailTransaction(req.params.id, (error) => {
    if (error) {
      return response(res, 500);
    }
    return res.status(200).json({
      status: true,
      message: "Deleted detail transaction id = " + req.params.id + " success",
    });
  });
};

exports.readDetailTransaction = (req, res) => {
  try {
    selectDetailTransaction(req.params.id, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Show detail transaction",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};
