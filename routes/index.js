import express from "express";
import { NotFound } from "../customErrors/customErrors.js";
import { checkAuth } from "../middlewares/auth.js";
const router = express.Router();

// Импорты контроллеров постов
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.js";

// Импорты контроллеров для юзака
import {
  getUsers,
  getUserById,
  getUserMe,
  createNewUser,
  login,
} from "../controllers/user.js";

// Роуты для постов
router.get("/posts", checkAuth, getPosts);
router.post("/posts", checkAuth, createPost);
router.patch("/posts/:id", checkAuth, updatePost);
router.delete("/posts/:id", checkAuth, deletePost);

// Роуты для юзака
router.get("/users", checkAuth, getUsers);
router.get("/user/:id", checkAuth, getUserById);
router.get("/users/me", checkAuth, getUserMe);
router.post("/signup", createNewUser);
router.post("/signin", login);

router.all("*", (req, res, next) => {
  next(new NotFound("Такого адреса не существует"));
});

export { router };
