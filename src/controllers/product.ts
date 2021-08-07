import { Request, Response } from 'express'

// Models
import Product from '../models/product';

export async function getProducts(req: Request, res: Response): Promise<Response> {
  try {
    let products = await Product.find().populate("owner category").exec();
    return res.json({
      status: true,
      products: products,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export async function getProduct(req: Request, res: Response): Promise<Response> {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate("owner category")
      .exec();
    return res.json({
      status: true,
      product: product,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export async function saveProduct(req: Request, res: Response): Promise<Response> {
  try {
    let product = new Product();
    product.owner = req.body.ownerID;
    product.category = req.body.categoryID;
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = (req as any).file.location;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    return res.json({
      status: true,
      message: "Successfully saved",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export async function updateProduct(req: Request, res: Response): Promise<Response> {
  try {
    let product = await Product.findByIdAndUpdate(
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
    return res.json({
      status: true,
      updatedProduct: product,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export async function deleteProduct(req: Request, res: Response): Promise<Response> {
  try {
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if (deletedProduct) {
      return res.json({
        status: true,
        message: "Successfully deleted",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};