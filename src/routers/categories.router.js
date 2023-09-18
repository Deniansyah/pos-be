const categoriesRouter = require("express").Router();
const { auth, isAdmin, isCashier } = require("../middlewares/auth");
const {
  readAllCategories,
  readCategories,
  createCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/categories.controller");

categoriesRouter.get("/categories", auth, isAdmin, readAllCategories);
categoriesRouter.post("/categories", auth, isAdmin, createCategories);
categoriesRouter.patch("/categories/:id", auth, isAdmin, updateCategories);
categoriesRouter.delete("/categories/:id", auth, isAdmin, deleteCategories);
categoriesRouter.get("/categories/:id", auth, isAdmin, readCategories);

categoriesRouter.get("/categories-cashier", auth, isCashier, readAllCategories);
categoriesRouter.get("/categories-cashier/:id", auth, isCashier, readCategories);


module.exports = categoriesRouter;