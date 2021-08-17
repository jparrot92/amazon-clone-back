import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: 'The request does not have the authentication header',
      });
    }

    const token = req.headers.authorization.toString().replace('Bearer ', '');

    const { exp } = jwt.decode(token) as {
      exp: number;
    };

    const expirationDatetimeInSeconds = exp * 1000;

    if (Date.now() >= expirationDatetimeInSeconds) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: 'The token has expired',
      });
    }

    const payload: string | any = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = payload.user;

    return next();
  } catch (e) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: 'The token is not valid',
    });
  }
}
