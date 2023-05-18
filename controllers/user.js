import User from "../models/user.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  NotFound,
  BadRequestError,
  UniqueError,
  ReferenceError,
} from "../customErrors/customErrors.js";

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const response = await User.find({});
    res.send(response);
  } catch (err) {
    res.send(`Ошибка произошла при получении Юзера ${err.name}`);
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = User.findById(id);
    if (!response) {
      throw new NotFound("Пользователь с таким ID не найден");
    }
    res.send(response);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(BadRequestError("Переданы неккоректные данные"));
      return;
    }
    res.send(`Ошибка произошла при получении Юзера по ID ${err.name}`);
    next(err);
  }
};

const getUserMe = async (req, res, next) => {
  try {
    const id = req.userId;
    const response = await User.findById(id);
    if (!response) {
      throw new NotFound("Пользователь с похожим ID не найден");
    }
    res.send(response);
  } catch (err) {
    next(err);
  }
};

const createNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const response = await User.create({
      name,
      email,
      passwordHash: hash,
    });
    const result = response.toObject();
    delete result.passwordHash;
    res.send(201, { data: result });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError("Переданы некорректные данные"));
      return;
    }
    if (err.conde === 11000) {
      next(new UniqueError("Пользователь с таким Email уже есть"));
      return;
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) {
      throw new NotFound("Пользователь не найден");
    }
    const isValid = await bcrypt.compare(password, user._doc.passwordHash);
    if (!isValid) {
      throw new ValidationError("Неправильные почта или пароль");
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      NODE_ENV === "production" ? JWT_SECRET : "secret-key-word",
      {
        expiresIn: "7d",
      }
    );
    const { passwordHash, ...userData } = user._doc;
    res.send({
      ...userData,
      token,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError("Переданы некорректные данные"));
      return;
    }
    next(err);
  }
};

export { getUsers, getUserById, getUserMe, createNewUser, login };
