import { Schema, model, Document } from 'mongoose';
import { IUser } from './user';

export interface IAddress extends Document {
  user: IUser['_id'];
  country: string;
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  phoneNumber: string;
  deliverInstructions: string;
  securityCode: string;
}

const addressSchema = new Schema<IAddress>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  country: String,
  fullName: String,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: Number,
  phoneNumber: String,
  deliverInstructions: String,
  securityCode: String,
});

export default model<IAddress>('Address', addressSchema);
