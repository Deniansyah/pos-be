const detailTransactionRouter = require("express").Router();
const {
  readAllDetailTransaction,
  createDetailTransaction,
  updateDetailTransaction,
  deleteDetailTransaction,
  readDetailTransaction,
} = require("../controllers/detailTransaction.controller");
const { auth, isCashier, isAdmin } = require("../middlewares/auth");

detailTransactionRouter.get("/detail-transaction", auth, isCashier, readAllDetailTransaction);
detailTransactionRouter.post("/detail-transaction", auth, isCashier, createDetailTransaction);
detailTransactionRouter.patch("/detail-transaction/:id", auth, isCashier, updateDetailTransaction);
detailTransactionRouter.delete("/detail-transaction/:id", auth, isCashier, deleteDetailTransaction);
detailTransactionRouter.get("/detail-transaction/:id", auth, isCashier, readDetailTransaction);

detailTransactionRouter.get("/detail-transaction-adm", auth, isAdmin, readAllDetailTransaction);
detailTransactionRouter.get("/detail-transaction-adm/:id", auth, isAdmin, readDetailTransaction);


module.exports = detailTransactionRouter;
