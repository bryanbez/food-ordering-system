import jwt from "jsonwebtoken";

export function getUserIdFromToken(token: string) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
      userId: string;
    };
    return payload.userId;
  } catch (error) {
    console.error("Error extracting user ID from token:", error);
    return null;
  }
}
