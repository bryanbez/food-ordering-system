import UserModel from "../models/user.model";
import type { RegisterUserInput } from "@/app/types/authTypes";
import { Types } from "mongoose";

export async function getUserByIdQuery(id: string) {
  try {
    const user = await UserModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $project: {
          name: 1,
          email: 1,
          address: 1,
          phone: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    return user[0] ?? null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export async function loginQuery(email: string) {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function createUserQuery(userData: RegisterUserInput) {
  try {
    const user = await UserModel.create(userData);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUserQuery(id: string, userData: RegisterUserInput) {
  try {
    const user = await UserModel.findByIdAndUpdate(id, userData, { new: true });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUserQuery(id: string) {
  try {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
