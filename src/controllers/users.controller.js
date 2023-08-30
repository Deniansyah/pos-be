const filter = require("../helpers/filter");
const response = require("../helpers/response");
const {
  selectAllUser,
  insertUser,
  selectUser,
  dropUser,
  changeUser,
  selectCountAllUser,
  changePicture,
  selectUserbyEmail,
} = require("../models/users.model");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../helpers/env")
const { cloudinary } = require("../middlewares/upload");


exports.readAllUser = (req, res) => {
  try {
    const searchable = ["name", "email", "role", "createdAt"];
    const sortable = ["name", "email", "role", "createdAt"];

    filter(req.query, searchable, sortable, selectCountAllUser, res, (filter, pageInfo) => {
      selectAllUser(filter, (error, data) => {
        if (error) {
          return response(res, 404, { message: "Error in model" });
        }
        return res.status(200).json({
          success: true,
          message: "Lists all casts",
          pageInfo,
          results: data.rows,
        });
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.createUser = (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      picture: req.file ? req.file.path : null,
    };

    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!payload.email.match(mailformat)) {
      return response(res, 400, {
        message: "You have entered an invalid email address!",
      });
    }

    if (payload.password.length < 8) {
      return response(res, 400, {
        message: "Password must be 8 or more characters!",
      });
    }

    selectUserbyEmail(req.body.email, (error, data) => {
      if (data.rows.length === 1) {
        return response(res, 400, {
          message: "Email sudah digunakan sebelumnya.",
        });
      }

      insertUser(payload, (error, data) => {
        return res.status(200).json({
          status: true,
          message: "User created success",
          results: data.rows[0],
        });
      });
    })
  } catch (error) {
    return response(res, 500);
  }
};

exports.updateUser = (req, res) => {
  try {
    selectUser(req.params.id, (error, results) => {
      const data = results.rows[0];
      if (data.picture) {
        const fileName = data?.picture?.split("/").pop()?.split(".")[0];
        cloudinary.uploader.destroy(`upload/${fileName}`);
      }

      const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        picture: req.file ? req.file.path : null,
      };

      if (req.body.email && req.body.password) {
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!payload.email.match(mailformat)) {
          return response(res, 400, {
            message: "You have entered an invalid email address!",
          });
        }

        if (payload.password.length < 8) {
          return response(res, 400, {
            message: "Password must be 8 or more characters!",
          });
        }
      }

      changeUser(req.params.id, payload, (error, data) => {
        if (error) {
          return response(res, 400, {
            success: false,
            message: "Failed to update!",
          });
        }
        
        return res.status(200).json({
          status: true,
          message: "Updated detail user",
          results: data.rows[0],
        });
      });
    })
  } catch (error) {
    return response(res, 500);
  }
};

exports.updateUserOperator = (req, res) => {
  try {
    selectUser(req.params.id, (error, results) => {
      const data = results.rows[0];
      if (data.picture) {
        const fileName = data?.picture?.split("/").pop()?.split(".")[0];
        cloudinary.uploader.destroy(`upload/${fileName}`);
      }

      const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        picture: req.file ? req.file.path : null,
      };

      if (req.body.email && req.body.password) {
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!payload.email.match(mailformat)) {
          return response(res, 400, {
            message: "You have entered an invalid email address!",
          });
        }

        if (payload.password.length < 8) {
          return response(res, 400, {
            message: "Password must be 8 or more characters!",
          });
        }
      }

      changeUser(req.params.id, payload, (error, data) => {
        if (error) {
          return response(res, 400, {
            success: false,
            message: "Failed to update!",
          });
        }

        return res.status(200).json({
          status: true,
          message: "Updated detail user",
          results: data.rows[0],
        });
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.deleteUser = (req, res) => {
  dropUser(req.params.id, (error) => {
    if (error) {
      return response(res, 500);
    }
    res.status(200).json({
      status: true,
      message: "Delete data user id = " + req.params.id + " success",
    });
  });
};

exports.readUser = (req, res) => {
  try {
    selectUser(req.params.id, (error, data) => {
      res.status(200).json({
        status: true,
        message: "Detail User",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.readUserOperator = (req, res) => {
  try {
    selectUser(req.params.id, (error, data) => {
      res.status(200).json({
        status: true,
        message: "Detail User",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.uploadUserPicture = (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, JWT_SECRET);
  try {
    selectUser(id, (error, results) => {
      const data = results.rows[0];

      if (data.picture) {
        const fileName = data?.picture?.split("/").pop()?.split(".")[0];
        cloudinary.uploader.destroy(`upload/${fileName}`);
      }

      const payload = {
        picture: req.file.path,
      };

      changePicture(id, payload, (error) => {
        if (error) {
          return response(res, 400, {
            success: false,
            message: "Failed to upload!",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Profile picture successfully updated",
        });
      })
    })
  } catch (error) {
    return response(res, 500);
  }
}
