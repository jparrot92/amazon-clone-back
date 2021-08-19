import { Request, Response } from 'express';
import axios from 'axios';

// Models
import Address from '../models/address';

export async function getAddresses(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const addresses = await Address.find({ user: req.user.id });
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'addresses listed',
      data: addresses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}

export async function createAddress(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const address = new Address();
    address.user = req.user;
    address.country = req.body.country;
    address.fullName = req.body.fullName;
    address.streetAddress = req.body.streetAddress;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipcode;
    address.phoneNumber = req.body.phoneNumber;
    address.deliverInstructions = req.body.deliverInstructions;
    address.securityCode = req.body.securityCode;

    await address.save();

    return res.status(201).json({
      success: true,
      status: 201,
      message: 'Successfuly created a new address',
      data: address,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}

export async function getCountries(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const response = await axios.get('https://restcountries.eu/rest/v2/all');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'countries listed',
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}
