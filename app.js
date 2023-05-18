import express from "express";
import dotenv from "dotenv";
import { PORT, DATA_BASE } from "./config.js";
import mongoose from "mongoose";
import { router } from "./routes/index.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DATA_BASE);
app.use(router);

app.listen(PORT, () => {
  console.log("Сервер запущен");
});
