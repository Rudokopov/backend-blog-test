import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config.js";
dotenv.config();

const app = express();

const hostname = "localhost";

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
