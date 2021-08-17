import { Schema, model, Document } from 'mongoose';
import { ICategory } from './category';
import { IOwner } from './owner';
import { IReview } from './review';
export interface IProduct extends Document {
  category: ICategory['_id'];
  owner: IOwner['_id'];
  title: string;
  description: string;
  photo: string;
  price: number;
  stockQuantity: number;
  rating: IReview['_id'];
}

const productSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
  title: String,
  description: String,
  photo: String,
  price: Number,
  stockQuantity: Number,
  rating: { type: Schema.Types.ObjectId, ref: 'Review' },
});

export default model<IProduct>('Product', productSchema);
