const transactionRouter = require("express").Router();
const {
  readAllTransaction,
  createTransaction,
  deleteTransaction,
  readTransaction,
  readAllTodaysTotals,
  readAllYesterdaysTotals,
  readTodaysCustomers,
  readYesterdaysCustomers,
} = require("../controllers/transaction.controller");
const { auth, isCashier } = require("../middlewares/auth");

transactionRouter.get("/transaction", auth, readAllTransaction);
transactionRouter.get("/transaction/today", auth, readAllTodaysTotals);
transactionRouter.get("/transaction/yesterday", auth, readAllYesterdaysTotals);
transactionRouter.get("/transaction/customer/today", auth, readTodaysCustomers);
transactionRouter.get("/transaction/customer/yesterday", auth, readYesterdaysCustomers);
transactionRouter.post("/transaction", auth, isCashier, createTransaction);
transactionRouter.delete("/transaction/:id", auth, isCashier, deleteTransaction);
transactionRouter.get("/transaction/:id", auth, readTransaction);


module.exports = transactionRouter;
