import { Request, Response } from 'express'

// Models
import Category from '../models/category';

export async function getCategories(req: Request, res: Response): Promise<Response> {
  try {
    let categories = await Category.find();
    return res.json({
      status: true,
      categories: categories,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export async function createCategory(req: Request, res: Response): Promise<Response> {
  try {
    const category = new Category();
    category.type = req.body.type;

    await category.save();

    return res.json({
      status: true,
      message: "Successfuly created a new category",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};