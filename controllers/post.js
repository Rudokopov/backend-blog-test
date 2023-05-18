import Post from "../models/post.js";
import mongoose from "mongoose";
import { NotFound, BadRequestError } from "../customErrors/customErrors.js";

const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Текущая страница (по умолчанию 1)
    const perPage = 20; // Количество статей на странице

    const totalPosts = await Post.countDocuments(); // Общее количество статей в базе данных
    const totalPages = Math.ceil(totalPosts / perPage); // Общее количество страниц

    const posts = await Post.find({})
      .skip((page - 1) * perPage) // Пропустить статьи на предыдущих страницах
      .limit(perPage); // Ограничить количество возвращаемых статей

    res.send({
      totalPosts,
      totalPages,
      currentPage: page,
      posts,
    });
  } catch (err) {
    res.send(`Ошибка произошла при получении карточек ${err.name}`);
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const id = req.userId;
    const { title, description } = req.body;
    const post = await Post.create({ title, description, author: id });
    res.send(post);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError("Переданы некорректные данные"));
      return;
    }
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, description } = req.body;
    const post = await Post.findById(id).populate(["author"]);
    if (!post) {
      throw new NotFound("Пост с таким ID не найден");
    }
    if (post.author.id !== userId) {
      throw new AccessError("У вас нет на это прав");
    }
    await Post.updateOne(
      { _id: id },
      { title, description },
      { new: true, runValidators: true }
    );

    res.send(post);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const post = await Post.findById(id).populate(["author"]);
    if (!post) {
      throw new NotFound("Пост с таким ID не найден");
    }
    if (post.author.id !== userId) {
      throw new AccessError("У вас нет на это прав");
    }
    await Post.deleteOne({ _id: id });
    res.send(post);
  } catch (err) {
    next(err);
  }
};

export { getPosts, createPost, updatePost, deletePost };
