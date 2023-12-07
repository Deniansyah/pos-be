const db = require("../helpers/db");

exports.selectAllTransaction = (filter, cb) => {
  db.query(
    `SELECT "t"."id" AS "id", "t"."users_id", "u"."name" AS "name", "t"."invoice", "t"."date", "t"."total", "t"."createdAt", "t"."updatedAt" FROM "transaction" "t" JOIN "users" "u" ON "t"."users_id" = "u"."id" WHERE ${filter.cInitUser}.${filter.searchBy} ILIKE $3 ORDER BY ${filter.cInitTrans}."${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`,
    [filter.limit, filter.offset, `%${filter.search}%`],
    cb
  );
};

exports.selectCountAllTransaction = (filter, cb) => {
  db.query(
    `SELECT COUNT(${filter.cInitUser}.${filter.searchBy}) AS "totalData" FROM "transaction" "t" JOIN "users" "u" ON "t"."users_id" = "u"."id" WHERE ${filter.cInitUser}.${filter.searchBy} ILIKE $1`,
    [`%${filter.search}%`],
    cb
  );
}

exports.insertTransaction = (data, cb) => {
  db.query(
    'INSERT INTO "transaction" ("users_id", "total") VALUES ($1, $2) RETURNING *',
    [data.users_id, data.total],
    cb
  );
};

exports.dropTransaction = (id, cb) => {
  db.query('DELETE FROM "transaction" WHERE id = $1', [id], cb);
};

exports.selectTransaction = (id, cb) => {
  db.query('SELECT "t"."id" AS "id", "t"."users_id", "u"."name" AS "name", "t"."invoice", "t"."date", "t"."total", "t"."createdAt", "t"."updatedAt" FROM "transaction" "t" JOIN "users" "u" ON "t"."users_id" = "u"."id" WHERE t.id = $1', [id], cb);
};

exports.selectAllTodaysTotals = (cb) => {
  db.query('SELECT CURRENT_DATE AS date, COALESCE(SUM(total), 0) AS allTotal FROM transaction WHERE date::date = CURRENT_DATE', cb)
}

exports.selectAllYesterdaysTotals = (cb) => {
  db.query(`SELECT CURRENT_DATE - INTERVAL '1 day' AS date, COALESCE(SUM(total), 0) AS allTotal FROM transaction WHERE date::date = (CURRENT_DATE - INTERVAL '1 day')::date`, cb)
}

exports.selectTodaysCustomers = (cb) => {
  db.query('SELECT COUNT(transaction.id) AS customer FROM transaction WHERE date::date = CURRENT_DATE', cb)
}

exports.selectYesterdaysCustomers = (cb) => {
  db.query(`SELECT COUNT(transaction.id) AS customer FROM transaction WHERE date::date = (CURRENT_DATE - INTERVAL '1 day')::date`, cb)
}