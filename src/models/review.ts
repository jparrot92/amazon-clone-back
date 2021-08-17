import { Schema, model, Document } from 'mongoose';
import { IProduct } from './product';
import { IUser } from './user';

export interface IReview extends Document {
  headline: string;
  body: string;
  rating: number;
  photo: string;
  product: IProduct['_id'];
  user: IUser['_id'];
}

const reviewSchema = new Schema({
  headline: String,
  body: String,
  rating: Number,
  photo: String,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model<IReview>('Review', reviewSchema);
