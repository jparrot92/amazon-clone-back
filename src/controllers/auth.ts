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
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Email or password is wrong',
      });
    }

    const correctPassword: boolean = await user.validatePassword(
      req.body.password
    );

    if (!correctPassword) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Invalid Password',
      });
    }

    // token
    const token: string = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    return res.status(200).header('auth-token', token).json({
      success: true,
      status: 200,
      message: 'User logged in',
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
