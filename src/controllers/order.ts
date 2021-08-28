import { Request, Response } from 'express';

// Models
import Order from '../models/order';

export async function getOrders(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const products = await Order.find({ owner: req.user._id })
      .populate('owner products.productID')
      .exec();

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'categories listed',
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}
