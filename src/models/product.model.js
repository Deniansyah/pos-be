const db = require("../helpers/db");

exports.selectAllProduct = (filter, cb) => {
  db.query(
    `SELECT p.id AS id, c.name AS categories_name, p.picture, p.name, p.description, p.price, p."createdAt", p."updatedAt" FROM product p JOIN categories c ON p.categories_id = c.id WHERE p.${filter.searchBy} ILIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $1 OFFSET $2`,
    [filter.limit, filter.offset, `%${filter.search}%`],
    cb
  );
};

exports.selectCountAllProduct = (filter, cb) => {
  db.query(
    `SELECT COUNT(${filter.searchBy}) AS "totalData" FROM "product" WHERE ${filter.searchBy} ILIKE $1`,
    [`%${filter.search}%`],
    cb
  );
};

exports.insertProduct = (data, cb) => {
  db.query(
    `INSERT INTO "product" ("categories_id", "picture", "name", "description", "price") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [data.categories_id, data.picture, data.name, data.description, data.price],
    cb
  );
};

exports.changeProduct = (id, data, cb) => {
  db.query(
    'UPDATE product SET "categories_id" = COALESCE(NULLIF($2, \'\')::INT, "categories_id"), "name" = COALESCE(NULLIF($3, \'\'), "name"), "price" = COALESCE(NULLIF($4, \'\')::BIGINT, "price"), "description" = COALESCE(NULLIF($5, \'\'), "description"), "picture" = COALESCE(NULLIF($6, \'\'), "picture") WHERE id = $1 RETURNING *',
    [
      id,
      data.categories_id,
      data.name,
      data.price,
      data.description,
      data.picture,
    ],
    cb
  );
};

exports.dropProduct = (id, cb) => {
  db.query('DELETE FROM "product" WHERE id = $1', [id], cb);
};

exports.selectProduct = (id, cb) => {
  db.query('SELECT p.id AS id, p.categories_id, c.name AS categories_name, p.picture, p.name, p.description, p.price, p."createdAt", p."updatedAt" FROM product p JOIN categories c ON p.categories_id = c.id WHERE p.id = $1', [id], cb);
};

