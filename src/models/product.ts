import { Schema, model, Document } from "mongoose";
import { ICategory } from "./category";
import { IOwner } from "./owner";


export interface IProduct extends Document {
  category: ICategory["_id"];
  owner: IOwner["_id"];
  title: String;
  description: String;
  photo: String;
  price: Number;
  stockQuantity: Number;
  rating: [Number];
}

const schema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  owner: { type: Schema.Types.ObjectId, ref: "Owner" },
  title: String,
  description: String,
  photo: String,
  price: Number,
  stockQuantity: Number,
  rating: [Number],
});

export default model<IProduct>("Product", schema);