const transactionRouter = require("express").Router();
const {
  readAllTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  readTransaction,
} = require("../controllers/transaction.controller");
const { auth, isCashier, isAdmin } = require("../middlewares/auth");

transactionRouter.get("/transaction", auth, isCashier, readAllTransaction);
transactionRouter.post("/transaction", auth, isCashier, createTransaction);
transactionRouter.patch("/transaction/:id", auth, isCashier, updateTransaction);
transactionRouter.delete("/transaction/:id", auth, isCashier, deleteTransaction);
transactionRouter.get("/transaction/:id", auth, isCashier, readTransaction);

transactionRouter.get("/transaction-adm", auth, isAdmin, readAllTransaction);
transactionRouter.get("/transaction-adm/:id", auth, isAdmin, readTransaction);


module.exports = transactionRouter;
