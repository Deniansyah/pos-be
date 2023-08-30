const usersRouter = require("express").Router();
const {
  readAllUser,
  createUser,
  updateUser,
  deleteUser,
  readUser,
  uploadUserPicture,
  readUserOperator,
  updateUserOperator,
} = require("../controllers/users.controller");
const { auth, isAdmin, isOperator } = require("../middlewares/auth");
const {
  upload: uploadMiddleware,
  uploadErrorHandler,
} = require("../middlewares/upload");

const upload = uploadMiddleware.single("picture");

usersRouter.patch("/upload", auth, upload, uploadErrorHandler, uploadUserPicture)

usersRouter.get("/users", auth, isAdmin, readAllUser);
usersRouter.post("/users", auth, isAdmin, upload, uploadErrorHandler, createUser);
usersRouter.patch("/users/:id", auth, isAdmin, upload, uploadErrorHandler, updateUser);
usersRouter.delete("/users/:id", auth, isAdmin, deleteUser);
usersRouter.get("/users/:id", auth, isAdmin, readUser);

usersRouter.patch("/users-operator/:id", auth, isOperator, upload, uploadErrorHandler, updateUserOperator);
usersRouter.get("/users-operator/:id", auth, isOperator, readUserOperator);

module.exports = usersRouter;
