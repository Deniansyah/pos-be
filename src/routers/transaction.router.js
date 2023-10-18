const transactionRouter = require("express").Router();
const {
  readAllTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  readTransaction,
} = require("../controllers/transaction.controller");
const { auth, isCashier } = require("../middlewares/auth");

transactionRouter.get("/transaction", auth, readAllTransaction);
transactionRouter.post("/transaction", auth, isCashier, createTransaction);
transactionRouter.patch("/transaction/:id", auth, isCashier, updateTransaction);
transactionRouter.delete("/transaction/:id", auth, isCashier, deleteTransaction);
transactionRouter.get("/transaction/:id", auth, readTransaction);


module.exports = transactionRouter;
