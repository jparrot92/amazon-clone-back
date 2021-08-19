import { Request, Response } from 'express';
import axios from 'axios';

// Models
import Address from '../models/address';
import User from '../models/user';

export async function getAddresses(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const addresses = await Address.find({ user: req.user._id });
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

export async function getAddress(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const address = await Address.findOne({
      user: req.user._id,
      _id: req.params.id,
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Address',
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

export async function updateAddress(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const foundAddress = await Address.findOne({
      user: req.user._id,
      _id: req.params.id,
    });
    if (foundAddress) {
      if (req.body.country) foundAddress.country = req.body.country;
      if (req.body.fullName) foundAddress.fullName = req.body.fullName;
      if (req.body.streetAddress)
        foundAddress.streetAddress = req.body.streetAddress;
      if (req.body.city) foundAddress.city = req.body.city;
      if (req.body.state) foundAddress.state = req.body.state;
      if (req.body.zipCode) foundAddress.zipCode = req.body.zipCode;
      if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
      if (req.body.deliverInstructions)
        foundAddress.deliverInstructions = req.body.deliverInstructions;
      if (req.body.securityCode)
        foundAddress.securityCode = req.body.securityCode;

      await foundAddress.save();

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully updated the address',
        data: foundAddress,
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

export async function deleteAddress(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const deletedAddress = await Address.remove({
      user: req.user._id,
      _id: req.params.id,
    });
    if (deletedAddress) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Address has been deleted',
        data: deletedAddress,
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

export async function setDefaultAddress(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const updatedAddressUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { address: req.body.id } }
    );
    if (updatedAddressUser) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully set this address as default',
        data: updatedAddressUser,
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
