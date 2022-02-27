import { Request, Response } from "express";
import { User } from "../models";
import { AuthError } from "../response";

export const me = async (req: Request, res: Response, next) => {
  const session = req.body.session;
  res.status(200).json({ user: session });
};

export const register = async (req: Request, res: Response, next) => {
  const { id, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return res.status(400).json({
      message: "passsword,passwordConfirm is not match",
    });
  }

  try {
    const session = await User.create({
      name: id,
      password,
    });
    req.body.session = session;
    next();
  } catch (error) {
    if (error.message.indexOf("duplicate key error") !== -1) {
      res.status(400).json({ message: "this id can't be use" });
    } else {
      res.status(500);
      res.end();
    }
  }
};

export const login = async (req: Request, res: Response, next) => {
  const { id, password } = req.body;
  try {
    const session = await User.findOne({ name: id });

    if (!session) {
      res.status(401);
      res.end();
    } else {
      if (session.password === password) {
        req.body.session = session;
        return next();
      }

      throw new AuthError("", 401);
    }
  } catch (error) {
    if (error.status === 401) {
      res.status(401);
      res.end();
    } else {
      res.status(500);
      res.end();
    }
  }
};
