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
  reviews: [IReview['_id']];
}

const productSchema = new Schema<IProduct>(
  {
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

productSchema.virtual('averageRating').get(function () {
  if (this.reviews.length > 0) {
    const sum = this.reviews.reduce((total: number, review: IReview) => {
      return total + review.rating;
    }, 0);

    return sum / this.reviews.length;
  }

  return 0;
});

export default model<IProduct>('Product', productSchema);
