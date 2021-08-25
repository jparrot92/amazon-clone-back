import { Schema, model, Document } from 'mongoose';
import { IProduct } from './product';
import { IUser } from './user';

export interface IOrder extends Document {
  owner: IUser['_id'];
  products: [IProduct['_id'], number, number];
  estimatedDelivery: string;
}

const orderSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productID: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
    },
  ],
  estimatedDelivery: String,
});

export default model<IOrder>('Order', orderSchema);
