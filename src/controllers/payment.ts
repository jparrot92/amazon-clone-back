import { Request, Response } from 'express';
import moment from 'moment';

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
