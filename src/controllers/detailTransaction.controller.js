const response = require("../helpers/response");
const filter = require("../helpers/filter");
const {
  selectAllDetailTransaction,
  insertDetailTransaction,
  changeDetailTransaction,
  dropDetailTransaction,
  selectDetailTransaction,
  selectALLTransactionByTransactionId,
  selectCountPopularProduct,
  selectPopularProduct,
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

exports.readAllTransactionByTransactionId = (req, res) => {
  try {
    selectALLTransactionByTransactionId(
      req.params.transaction_id,
      (error, data) => {
        return res.status(200).json({
          status: true,
          message: "Show all transaction by transactin_id",
          results: data.rows,
        });
      }
    );
  } catch (error) {
    return response(res, 500);
  }
};

exports.createDetailTransactionArray = async (req, res) => {
  try {
    const body = req.body;
    const responseData = [];

    for (let i = 0; i < body.length; i++) {
      await new Promise((resolve) => {
        insertDetailTransaction(body[i], (error, data) => {
          if (res.headersSent) {
            // Headers sudah dikirim, hentikan iterasi
            return resolve();
          }

          if (error) {
            if (error.message.includes('null value in column "transaction_id"')) {
              return resolve(response(res, 404, { message: "transaction_id is null" }));
            } else {
              resolve(response(res, 500));
            }
          } else {
            responseData.push(data.rows[0]);
            resolve();
          }
        });
      });
    }

    // Kirim tanggapan setelah loop selesai
    if (!res.headersSent) {
      return res.status(200).json({
        status: true,
        message: "Detail transaction add successfully",
        results: responseData
      });
    }
  } catch (error) {
    return response(res, 500);
  }
};

exports.readPopularProduct = (req, res) => {
  try {
    const searchable = ["name", "description", "createdAt"];
    const sortable = ["name", "description", "createdAt"];

    filter(
      req.query,
      searchable,
      sortable,
      selectCountPopularProduct,
      res,
      (filter, pageInfo) => {
        try {
          selectPopularProduct(filter, (error, data) => {
            return res.status(200).json({
              success: true,
              message: "Popular Product Data List",
              pageInfo,
              results: data?.rows,
            });
          });
        } catch (error) {
          return response(res, 500);
        }
      }
    );
  } catch (error) {
    return response(res, 500);
  }
};
