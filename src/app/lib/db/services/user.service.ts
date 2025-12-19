import * as userRepo from "../repositories/user.repo";
import type { LoginUserInput, RegisterUserInput } from "@/app/types/authTypes";
import bcrypt from "bcryptjs";

export async function getUserByIdService(id: string) {
  try {
    const user = await userRepo.getUserByIdQuery(id);
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export async function loginUserService(userData: LoginUserInput) {
  try {
    console.log("Attempting login for:", userData.email);
    const user = await userRepo.loginQuery(userData.email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export async function createUserService(userData: RegisterUserInput) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const savedUser = await userRepo.createUserQuery(userData);
    return savedUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUserService(
  id: string,
  userData: RegisterUserInput
) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const updatedUser = await userRepo.updateUserQuery(id, userData);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// export async function deleteUserService(id: string) {
//     try {
//         const deletedUser = await userRepo.deleteUserQuery(id);
//         return deletedUser;
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         throw error;
//     }
// }
