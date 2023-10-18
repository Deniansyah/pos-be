const detailTransactionRouter = require("express").Router();
const {
  readAllDetailTransaction,
  createDetailTransaction,
  updateDetailTransaction,
  deleteDetailTransaction,
  readDetailTransaction,
} = require("../controllers/detailTransaction.controller");
const { auth, isCashier } = require("../middlewares/auth");

detailTransactionRouter.get("/detail-transaction", auth, readAllDetailTransaction);
detailTransactionRouter.post("/detail-transaction", auth, isCashier, createDetailTransaction);
detailTransactionRouter.patch("/detail-transaction/:id", auth, isCashier, updateDetailTransaction);
detailTransactionRouter.delete("/detail-transaction/:id", auth, isCashier, deleteDetailTransaction);
detailTransactionRouter.get("/detail-transaction/:id", auth, readDetailTransaction);


module.exports = detailTransactionRouter;
