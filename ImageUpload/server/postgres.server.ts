import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "trialDB",
  password: "Admin@123",
});

export default pool;
