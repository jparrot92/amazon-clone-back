import { Request, Response } from 'express';

// Models
import Order from '../models/order';

export async function getOrders(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const products = await Order.find({ owner: req.user._id })
      .populate('owner')
      .populate({
        path: 'products.productID',
        populate: {
          path: 'owner',
          model: 'Owner',
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Order',
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
