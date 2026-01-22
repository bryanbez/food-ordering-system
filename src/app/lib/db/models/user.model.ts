import { Schema, model, models, ObjectId } from "mongoose";

export interface UserDocument {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

const UserModel = models.User || model<UserDocument>("User", UserSchema);

export default UserModel;
