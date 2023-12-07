const filter = require("../helpers/filter");
const response = require("../helpers/response");
const {
  selectAllTransaction,
  selectCountAllTransaction,
  insertTransaction,
  dropTransaction,
  selectTransaction,
  selectAllTodaysTotals,
  selectAllYesterdaysTotals,
  selectTodaysCustomers,
  selectYesterdaysCustomers,
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

exports.readAllTodaysTotals = (req, res) => {
  try {
    selectAllTodaysTotals((error, data) => {
      return res.status(200).json({
        status: true,
        message: "All today's totals",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.readAllYesterdaysTotals = (req, res) => {
  try {
    selectAllYesterdaysTotals((error, data) => {
      return res.status(200).json({
        status: true,
        message: "All yesterday's totals",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.readTodaysCustomers = (req, res) => {
  try {
    selectTodaysCustomers((error, data) => {
      return res.status(200).json({
        status: true,
        message: "Today's Customers",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.readYesterdaysCustomers = (req, res) => {
  try {
    selectYesterdaysCustomers((error, data) => {
      return res.status(200).json({
        status: true,
        message: "Yesterday's customers",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};