import { Schema, model, models, ObjectId } from "mongoose";

export interface UserDocument {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const UserModel = models.User || model<UserDocument>("User", UserSchema);

export default UserModel;
