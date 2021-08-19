import { Request, Response } from 'express';

// Models
import Review from '../models/review';
import Product from '../models/product';

export async function createReview(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const review = new Review();
    review.headline = req.body.headline;
    review.body = req.body.body;
    review.rating = req.body.rating;
    review.photo = req.file.location;
    review.user = req.user._id;
    review.product = req.params.productID;

    await Product.findOneAndUpdate(
      { _id: review.product },
      { $push: { reviews: review._id } }
    );

    const savedReview = await review.save();

    if (savedReview) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully Added Review',
        data: savedReview,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}

export async function getReview(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const productReviews = await Review.find({ product: req.params.productID })
      .populate('user')
      .exec();
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Review',
      data: productReviews,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}
