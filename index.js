const express = require("express");
const cors = require("cors");
const { PORT } = require("./src/helpers/env");

const authRouter = require("./src/routers/auth.router");
const usersRouter = require("./src/routers/user.router");
const categoriesRouter = require("./src/routers/categories.router")
const productRouter = require("./src/routers/product.router");
const transactionRouter = require("./src/routers/transaction.router");
const detailTransactionRouter = require("./src/routers/detailTransaction.router");

const app = express()

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Beckend is running well",
  });
});

app.use(authRouter);
app.use(usersRouter);
app.use(categoriesRouter);
app.use(productRouter);
app.use(transactionRouter);
app.use(detailTransactionRouter);

const APP_PORT = PORT || 3001;
app.listen(APP_PORT, () => {
  console.log(`service running at PORT ${APP_PORT}`);
});
