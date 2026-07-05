import express from "express";
import { connectDB } from "./db.js";
import "dotenv/config"; // Loads .env variables

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function connectServer() {
 try {
  await connectDB();
  app.listen(PORT, () => {
   console.log(`Server is listening to PORT : ${PORT}`);
  });
 } catch (error) {
  console.error("Failed to connect to Database.", error);
  process.exit(1);
 }
}

connectServer();
