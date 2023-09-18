const productRouter = require("express").Router();
const { auth, isAdmin, isCashier } = require("../middlewares/auth");
const {
  readAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  readProduct,
  uploadProduct,
} = require("../controllers/product.controller");
const {
  upload: uploadMiddleware,
  uploadErrorHandler,
} = require("../middlewares/upload");

const upload = uploadMiddleware.single("picture");

productRouter.patch(
  "/product/upload/:id",
  auth,
  isAdmin,
  upload,
  uploadErrorHandler,
  uploadProduct
);

productRouter.get("/product", auth, isAdmin, readAllProduct);
productRouter.post(
  "/product",
  auth,
  isAdmin,
  upload,
  uploadErrorHandler,
  createProduct
);
productRouter.patch(
  "/product/:id",
  auth,
  isAdmin,
  upload,
  uploadErrorHandler,
  updateProduct
);
productRouter.delete("/product/:id", auth, isAdmin, deleteProduct);
productRouter.get("/product/:id", auth, isAdmin, readProduct);

productRouter.get("/product-cashier", auth, isCashier, readAllProduct)
productRouter.get("/product-cashier/:id", auth, isCashier, readProduct)


module.exports = productRouter;
