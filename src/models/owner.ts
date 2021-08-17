import { Schema, model, Document } from 'mongoose';

export interface IOwner extends Document {
  name: string;
  about: string;
  photo: string;
}

const ownerSchema = new Schema({
  name: String,
  about: String,
  photo: String,
});

export default model<IOwner>('Owner', ownerSchema);
