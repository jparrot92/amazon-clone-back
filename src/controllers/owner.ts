import { Request, Response } from 'express';

// Models
import Owner from '../models/owner';

export async function getOwners(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const owners = await Owner.find();
    return res.json({
      status: true,
      owners: owners,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

export async function createOwner(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = (req as any).file.location;
    await owner.save();

    return res.json({
      status: true,
      message: 'Successfuly created a new owner',
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}
