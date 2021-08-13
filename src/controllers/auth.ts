import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';

// 86400 Segundos = 1 Días
const createToken = (user: IUser): string => {
  return jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: 86400 });
};

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
    const token = createToken(user);

    return res.status(201).json({
      success: true,
      status: 201,
      message: 'User created',
      token,
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
    const token = createToken(user);

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Login succede',
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}

export async function user(req: Request, res: Response): Promise<Response> {
  try {
    // saving new user
    const user = await User.findOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Profile user',
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}
