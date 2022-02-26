import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { AuthError } from "../response";

const setBearerHeader = (token: string) => `Bearer ${token}`;

export const authSign = (req: Request, res: Response, next) => {
  const token = jwt.sign(
    {
      exp: ~~(Date.now() / 1000 + 60 * 60 * 9),
    },
    process.env.AUTH_SECRET
  );

  res.header("Authorization", setBearerHeader(token));
  res.send(200);
};

export const authChecker = async (req: Request, res: Response, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split("Bearer ")[1];

      const authInfo = jwt.verify(token, process.env.AUTH_SECRET);
      req.body.authInfo = authInfo;
    } else {
      throw new AuthError("token is invalid", 401);
    }
  } catch (error) {
    if (error.message === "token is invalid") {
      res.status(401).json({
        message: error.message,
      });
    }
    res.status(401);
  }
};
