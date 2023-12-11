const detailTransactionRouter = require("express").Router();
const {
  readAllDetailTransaction,
  createDetailTransaction,
  updateDetailTransaction,
  deleteDetailTransaction,
  readDetailTransaction,
  readAllTransactionByTransactionId,
  createDetailTransactionArray,
  readPopularProduct,
  readTodaysOrdered,
  readYesterdaysOrdered
} = require("../controllers/detailTransaction.controller");
const { auth, isCashier } = require("../middlewares/auth");

detailTransactionRouter.get("/detail-transaction", auth, readAllDetailTransaction);
detailTransactionRouter.get("/detail-transaction/ordered/today", auth, readTodaysOrdered);
detailTransactionRouter.get("/detail-transaction/ordered/yesterday", auth, readYesterdaysOrdered);
detailTransactionRouter.get("/detail-transaction/popular-product", readPopularProduct);
detailTransactionRouter.post("/detail-transaction", auth, isCashier, createDetailTransaction);
detailTransactionRouter.post("/detail-transaction-arr", auth, isCashier, createDetailTransactionArray);
detailTransactionRouter.patch("/detail-transaction/:id", auth, isCashier, updateDetailTransaction);
detailTransactionRouter.delete("/detail-transaction/:id", auth, isCashier, deleteDetailTransaction);
detailTransactionRouter.get("/detail-transaction/:id", auth, readDetailTransaction);
detailTransactionRouter.get("/detail-transaction/by/:transaction_id", auth, readAllTransactionByTransactionId);


module.exports = detailTransactionRouter;
