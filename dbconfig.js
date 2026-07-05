import pg from "pg";
import fs from "fs";
import 'dotenv/config'; // Loads .env variables

const config = {
 user: process.env.DB_USER,
 password: process.env.DB_PASS,
 host: process.env.DB_HOST,
 port: process.env.DB_PORT,
 database: process.env.DB,
 ssl: {
  rejectUnauthorized: true,
  ca: fs.readFileSync("./ca.pem").toString(),
 },
};

const client=new pg.Client(config);
client.connect(function (err) {
  if (err) throw err;
  client.query("SELECT VERSION()", [], function (err, result) {
    if (err) throw err;

    console.log(result.rows[0]);
    client.end(function (err) {
      if (err) throw err;
    });
  });
});

