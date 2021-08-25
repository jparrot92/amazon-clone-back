import { Request, Response } from 'express';
import config from '../config';
import Order from '../models/order';
import Product, { IProduct } from '../models/product';
import moment from 'moment';
import Stripe from 'stripe';

const stripe = new Stripe(config.stripeSecreyKey, {
  apiVersion: '2020-08-27',
});

const SHIPMENT = {
  normal: {
    price: 13.98,
    days: 7,
  },
  fast: {
    price: 49.98,
    days: 3,
  },
};

function shipmentPrice(shipmentOption) {
  const estimated = moment()
    .add(shipmentOption.days, 'd')
    .format('dddd MMMM Do');

  return { estimated, price: shipmentOption.price };
}

export async function calculateShipment(
  req: Request,
  res: Response
): Promise<Response> {
  let shipment;
  if (req.body.shipment === 'normal') {
    shipment = shipmentPrice(SHIPMENT.normal);
  } else {
    shipment = shipmentPrice(SHIPMENT.fast);
  }
  return res.status(200).json({
    success: true,
    status: 200,
    message: 'Shipment',
    data: shipment,
  });
}

export async function createPayment(
  req: Request,
  res: Response
): Promise<Response> {
  const totalPrice = Math.round(req.body.totalPrice * 100);

  try {
    // Payment Stripe
    const customer: Stripe.Customer = await stripe.customers.create({
      email: req.user.email,
    });

    const source: Stripe.CustomerSource = await stripe.customers.createSource(
      customer.id,
      {
        source: 'tok_visa',
      }
    );

    const charge: Stripe.Charge = await stripe.charges.create({
      amount: totalPrice,
      currency: 'usd',
      customer: customer.id,
      source: source.id,
    });

    // Create Order
    const order = new Order();
    const cart = req.body.cart;

    // eslint-disable-next-line array-callback-return
    cart.map((product) => {
      order.products.push({
        productID: product._id,
        quantity: parseInt(product.quantity),
        price: product.price,
      });
    });

    order.owner = req.user._id;
    order.estimatedDelivery = req.body.estimatedDelivery;
    const savedOrder = await order.save();

    return res.status(201).json({
      success: true,
      status: 201,
      message: 'Successfully made a payment',
      data: savedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}
