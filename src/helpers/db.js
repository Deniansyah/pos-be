const { Pool } = require("pg");
const { DB_URL, DB_SUPABASE } = require("./env")

const db = new Pool({ connectionString: DB_SUPABASE || DB_URL });

module.exports = db;
