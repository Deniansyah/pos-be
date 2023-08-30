const response = require("../helpers/response");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../helpers/env");
const { selectUserByEmail } = require("../models/auth.model");
const bcrypt = require("bcrypt");


module.exports = {
  login: (req, res) => {
    try {
      const email = req.body.email
      const password = req.body.password

      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        return response(res, 400, {
          message: "You have entered an invalid email address!",
        });
      }

      if (password.length < 8) {
        return response(res, 400, {
          message: "Password must be 8 or more characters!",
        });
      }

      selectUserByEmail(email, async (error, { rows }) => {
        if (rows.length) {
          const [users] = rows;
          if (await bcrypt.compare(password, users.password)) {
            const token = jwt.sign(
              { id: users.id, email: users.email, role: users.role },
              JWT_SECRET
            );
            return response(res, 200, {
              data: token,
              name: users.name,
              role: users.role,
              message: "Login success",
            });
          }else{
            return response(res, 404, { message: "Email or Password wrong" });
          }
        }
      });
    } catch (error) {
      return response(res, 500);
    }
  },
};
