import Post from "../models/post.js";
import mongoose from "mongoose";
import {
  NotFound,
  BadRequestError,
  UniqueError,
  ReferenceError,
} from "../customErrors/customErrors.js";

const getPosts = async (req, res, next) => {
  try {
    const response = await Post.find({});
    res.send(response);
  } catch (err) {
    res.send(`Ошибка произошла при получении карточек ${err.name}`);
    next(err);
  }
};
