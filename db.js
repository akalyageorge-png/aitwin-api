import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, "ca.pem")).toString(),
  },
};

const client = new pg.Client(config);

let connected = false;

export async function connectDB() {
  if (connected) return client;

  await client.connect();
  connected = true;

  const result = await client.query("SELECT VERSION()");
  console.log(`PostgreSQL Connected Successfully. Version: ${result.rows[0].version}`);

  return client;
}

export default client;