const transactionRouter = require("express").Router();
const {
  readAllTransaction,
  createTransaction,
  deleteTransaction,
  readTransaction,
} = require("../controllers/transaction.controller");
const { auth, isCashier } = require("../middlewares/auth");

transactionRouter.get("/transaction", auth, readAllTransaction);
transactionRouter.post("/transaction", auth, isCashier, createTransaction);
transactionRouter.delete("/transaction/:id", auth, isCashier, deleteTransaction);
transactionRouter.get("/transaction/:id", auth, readTransaction);


module.exports = transactionRouter;
