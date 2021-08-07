import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  type: string;
}

const schema = new Schema({
  type: { type: String, unique: true, required: true },
});

export default model<ICategory>("Category", schema);
