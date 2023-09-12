const db = require("../helpers/db");

exports.selectAllCategories = (filter, cb) => {
  db.query(
    `SELECT * FROM "categories" WHERE ${filter.searchBy} ILIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $1 OFFSET $2`,
    [filter.limit, filter.offset, `%${filter.search}%`],
    cb
  );
};

exports.selectCountAllCategories = (filter, cb) => {
  db.query(
    `SELECT COUNT(${filter.searchBy}) AS "totalData" FROM "categories" WHERE ${filter.searchBy} ILIKE $1`,
    [`%${filter.search}%`],
    cb
  );
};

exports.insertCategories = (data, cb) => {
  db.query(
    `INSERT INTO "categories" ("name") VALUES ($1) RETURNING *`,
    [data.name],
    cb
  );
};

exports.changeCategories = (id, data, cb) => {
  db.query(
    'UPDATE "categories" SET "name" = COALESCE(NULLIF($2, \'\'), "name") WHERE id = $1 RETURNING *',
    [id, data.name],
    cb
  );
};

exports.dropCategories = (id, cb) => {
  db.query('DELETE FROM "categories" WHERE id = $1', [id], cb);
};

exports.selectCategories = (id, cb) => {
  db.query('SELECT * FROM "categories" WHERE id = $1', [id], cb);
};

