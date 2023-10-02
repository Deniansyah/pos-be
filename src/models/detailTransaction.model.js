const db = require("../helpers/db");

exports.selectAllDetailTransaction = (cb) => {
  db.query(`SELECT * FROM "detailTransaction"`, cb);
};

exports.insertDetailTransaction = (data, cb) => {
  db.query(
    'INSERT INTO "detailTransaction" ("transaction_id", "product_id", "product_name", "product_price", "qty") VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [data.transaction_id, data.product_id, data.product_name, data.product_price, data.qty],
    cb
  );
};

exports.changeDetailTransaction = (id, data, cb) => {
  db.query(
    'UPDATE "detailTransaction" SET "transaction_id" = COALESCE(NULLIF($2, \'\')::INT, "transaction_id"), "product_id" = COALESCE(NULLIF($3, \'\')::INT, "product_id"), "product_name" = COALESCE(NULLIF($4, \'\')::VARCHAR, "product_name"), "product_price" = COALESCE(NULLIF($5, \'\')::INT, "product_price"), "qty" = COALESCE(NULLIF($6, \'\')::INT, "qty") WHERE id = $1 RETURNING *',
    [id, data.transaction_id, data.product_id, data.product_name, data.product_price, data.qty],
    cb
  );
};

exports.dropDetailTransaction = (id, cb) => {
  db.query('DELETE FROM "detailTransaction" WHERE id = $1', [id], cb);
};

exports.selectDetailTransaction = (id, cb) => {
  db.query('SELECT * FROM "detailTransaction" WHERE id = $1', [id], cb);
};
