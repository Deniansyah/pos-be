const usersRouter = require("express").Router();
const {
  readAllUser,
  createUser,
  updateUser,
  deleteUser,
  readUser,
  uploadUserPicture,
} = require("../controllers/users.controller");
const { auth, isAdmin } = require("../middlewares/auth");
const {
  upload: uploadMiddleware,
  uploadErrorHandler,
} = require("../middlewares/upload");

const upload = uploadMiddleware.single("picture");
usersRouter.patch("/upload", auth, upload, uploadErrorHandler, uploadUserPicture)

usersRouter.get("/users", auth, isAdmin, readAllUser);
usersRouter.post("/users", auth, isAdmin, upload, uploadErrorHandler, createUser);
usersRouter.patch("/users/:id", auth, upload, uploadErrorHandler, updateUser);
usersRouter.delete("/users/:id", auth, isAdmin, deleteUser);
usersRouter.get("/users/:id", auth, readUser);

module.exports = usersRouter;
