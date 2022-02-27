import { Request, Response } from "express";
import { User } from "../models";
import { AuthError } from "../response";

export const register = async (req: Request, res: Response, next) => {
  const { id, password, passwordConfirm } = req.body;
  console.log(req.body);
  if (password !== passwordConfirm) {
    return res.status(400).json({
      message: "passsword,passwordConfirm is not match",
    });
  }

  try {
    const isExistUser = await User.findOne({ name: id });
    if (isExistUser) {
      return res.status(400).json({
        message: "user is already exist",
      });
    }

    const session = await User.create({
      name: id,
      password,
    });
    req.body.session = session;
    next();
  } catch (error) {
    res.status(500);
  }
};

export const login = async (req: Request, res: Response, next) => {
  const { id, password } = req.body;
  try {
    const session = await User.findOne({ name: id });

    if (!session) {
      return res.status(400);
    } else {
      console.log("session: ", session);
      if (session.password === password) {
        req.body.session = session;
        return next();
      }

      throw new AuthError("", 401);
    }
  } catch (error) {
    if (error.status === 401) {
      res.status(401);
    } else {
      res.status(500);
    }
  }
};
