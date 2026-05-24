import { Pool } from "pg"

export const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "casahoy",
  user: process.env.DB_USER || "app",
  password: process.env.DB_PASSWORD || "app"
})