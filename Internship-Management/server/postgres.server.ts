import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : undefined;

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  port: port,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

export default pool;
