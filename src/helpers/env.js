require("dotenv").config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const DB_SUPABASE = process.env.DB_SUPABASE;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const JWT_SECRET = process.env.JWT_SECRET;
const CLOUD_NAME = process.env.CLOUD_NAME; 
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

module.exports = {
  PORT,
  DB_URL,
  DB_SUPABASE,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  JWT_SECRET,
  CLOUD_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
};
