import { Request, Response } from 'express';

// Models
import Category from '../models/category';

export async function getCategories(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'categories listed',
      data: categories,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}

export async function createCategory(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const category = new Category();
    category.type = req.body.type;

    await category.save();

    return res.status(201).json({
      success: true,
      status: 201,
      message: 'Successfuly created a new category',
      data: category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}
