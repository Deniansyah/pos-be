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

exports.selectALLTransactionByTransactionId = (transaction_id, cb) => {
  db.query('SELECT * FROM "detailTransaction" WHERE transaction_id = $1', [transaction_id], cb);
};

exports.selectPopularProduct = (filter, cb) => {
  db.query(
    `SELECT p.id, p.picture, dt.product_name AS name, p.description, dt.product_price AS price, SUM(dt.qty) AS total_qty, MIN(dt."createdAt") AS min_createdAt, MAX(dt."updatedAt") AS max_updatedAt FROM "detailTransaction" dt JOIN product p ON dt.product_id = p.id GROUP BY p.id, p.picture, dt.product_name, p.description, dt.product_price ORDER BY total_qty DESC LIMIT $1 OFFSET $2`,
    [filter.limit, filter.offset],
    cb
  );
};

exports.selectCountPopularProduct = (filter, cb) => {
  db.query(
    `SELECT COUNT(dt.product_name) AS "totalData" FROM "detailTransaction" dt JOIN product p ON dt.product_id = p.id`,
    cb
  );
};

exports.selectTodaysOrdered = (cb) => {
  db.query('SELECT COALESCE(SUM(qty), 0) AS "productOrdered" FROM "detailTransaction" WHERE "createdAt"::date = CURRENT_DATE', cb)
}

exports.selectYesterdaysOrdered = (cb) => {
  db.query(`SELECT COALESCE(SUM(qty), 0) AS "productOrdered" FROM "detailTransaction" WHERE "createdAt"::date = (CURRENT_DATE - INTERVAL '1 day')::date`, cb)
}