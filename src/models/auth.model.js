const db = require("../helpers/db");

exports.selectUserByEmail = (email, cb) => {
  db.query('SELECT * FROM "users" WHERE email = $1', [email], cb);
};
