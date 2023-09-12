const express = require("express");
const cors = require("cors");
const { PORT } = require("./src/helpers/env");

const authRouter = require("./src/routers/auth.router");
const usersRouter = require("./src/routers/user.router");
const categoriesRouter = require("./src/routers/categories.router")
const productRouter = require("./src/routers/product.router");
// const stockRouter = require("./src/routers/stock.router");

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
// app.use(stockRouter);

const APP_PORT = PORT || 3001;
app.listen(APP_PORT, () => {
  console.log(`service running at PORT ${APP_PORT}`);
});
