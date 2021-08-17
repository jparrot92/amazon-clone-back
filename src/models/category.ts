import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  type: string;
}

const categorySchema = new Schema({
  type: { type: String, unique: true, required: true },
});

export default model<ICategory>('Category', categorySchema);
