import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { router } from "./routes/index.js";
dotenv.config();

const { DATA_BASE } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DATA_BASE);
app.use(router);

app.listen(PORT, () => {
  console.log("Сервер запущен");
});
