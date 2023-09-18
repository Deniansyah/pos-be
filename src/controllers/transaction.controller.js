const filter = require("../helpers/filter");
const response = require("../helpers/response");
const {
  selectAllTransaction,
  selectCountAllTransaction,
  insertTransaction,
  changeTransaction,
  dropTransaction,
  selectTransaction,
} = require("../models/transaction.model");

exports.readAllTransaction = (req, res) => {
  try {
    const searchable = ["name", "invoice", "date", "total", "createdAt", "u", "t"];
    const sortable = ["name", "invoice", "date", "total", "createdAt", "u", "t"];

    filter(req.query, searchable, sortable, selectCountAllTransaction, res, (filter, pageInfo) => {
      selectAllTransaction(filter, (error, data) => {
        if (error) {
          return response(res, 404, { message: "Error in model" });
        }

        return res.status(200).json({
          status: true,
          message: "Lists data of transaction",
          pageInfo,
          results: data.rows,
        });
      });
    })
  } catch (error) {
    return response(res, 500);
  }
};

exports.createTransaction = (req, res) => {
  const payload = {
    users_id: req.body.users_id,
    date: req.body.date,
    total: req.body.total,
  };

  try {
    insertTransaction(payload, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Transaction add successfully",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.updateTransaction = (req, res) => {
  const payload = {
    users_id: req.body.users_id,
    date: req.body.date,
    total: req.body.total,
  };

  try {
    changeTransaction(req.params.id, payload, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Updated data transaction is success",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.deleteTransaction = (req, res) => {
  dropTransaction(req.params.id, (error) => {
    if (error) {
      return response(res, 500);
    }
    return res.status(200).json({
      status: true,
      message: "Deleted transaction id = " + req.params.id + " success",
    });
  });
};

exports.readTransaction = (req, res) => {
  try {
    selectTransaction(req.params.id, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Show detail transaction",
        results: data.rows[0],
      });
    })
  } catch (error) {
    return response(res, 500);
  }
};

