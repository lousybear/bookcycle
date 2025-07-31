import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  email?: string;
  phone?: string;
  passwordHash: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
