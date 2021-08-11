import { Request, Response } from 'express';

// Models
import Product from '../models/product';

export async function getProducts(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const products = await Product.find().populate('owner category').exec();
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'products listed',
      data: products,
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

export async function getProduct(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const product = await Product.findOne({ _id: req.params.id })
      .populate('owner category')
      .exec();
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Product',
      data: product,
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

export async function saveProduct(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const product = new Product();
    product.owner = req.body.ownerID;
    product.category = req.body.categoryID;
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = (req as any).file.location;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Successfully saved',
      data: product,
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

export async function updateProduct(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          photo: (req as any).file.location,
          description: req.body.description,
          owner: req.body.ownerID,
        },
      },
      { upsert: true }
    );
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Successfully update',
      data: product,
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

export async function deleteProduct(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
    });

    if (deletedProduct) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully deleted',
        data: deletedProduct,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
      data: {},
    });
  }
}
