import mongoose from "mongoose";
import { dbConfig } from "@/app/lib/db/config";

if (!dbConfig.uri) {
  throw new Error(
    "Please define the MONGO_DB_CREDENTIAL environment variable inside .env.local"
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Global declaration to prevent multiple connections in dev mode
declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: dbConfig.dbName,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(dbConfig.uri!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
