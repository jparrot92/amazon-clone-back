import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';

export async function signup(req: Request, res: Response): Promise<Response> {
  try {
    // saving new user
    const user: IUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user.password = await user.encrypPassword(user.password);
    const savedUser = await user.save();

    // token
    const token: string = jwt.sign(
      savedUser.toJSON(),
      process.env.TOKEN_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    return res.status(201).header('auth-token', token).json({
      success: true,
      status: 201,
      message: 'User created',
      data: savedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}

export async function signin(req: Request, res: Response): Promise<Response> {
  try {
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'categories listed',
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
      data: {},
    });
  }
}
