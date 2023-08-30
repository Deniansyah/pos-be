const response = require("../helpers/response");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../helpers/env");

module.exports = {
  auth: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return response(res, 404, { message: "Token required" });
      }
      // Bearer dsgdhjsgdhjsgdhsgdSJh => ["Bearer", "d59dhjsgdhjsgdhsgdsh"]
      const token = authorization.split(" ")[1];
      const decode = await jwt.verify(token, JWT_SECRET);
      console.log(decode);
      req.userData = decode;
      next();
    } catch (error) {
      return response(res, 500);
    }
  },
  isAdmin: async (req, res, next) => {
    try {
      const user = req.userData;
      if (user.role === 1) {
        next();
      } else {
        return response(res, 404, { message: "Only admin" });
      }
    } catch (error) {
      return response(res, 500);
    }
  },
  isOperator: async (req, res, next) => {
    try {
      const user = req.userData;
      if (user.role === 2) {
        next();
      } else {
        return response(res, 404, { message: "Only Operator" });
      }
    } catch (error) {
      return response(res, 500);
    }
  },
};