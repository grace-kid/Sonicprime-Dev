import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  try {
    if (cached.conn) {
      console.log("Using cached MongoDB connection");
      return cached.conn;
    }

    if (!cached.promise) {
      console.log("Initiating new MongoDB connection...");
      // Log connection details (without exposing password)
      const uriDisplay = MONGODB_URI.replace(/:[^@]*@/, ":***@");
      console.log("Connection URI:", uriDisplay);

      cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      });
    }

    cached.conn = await cached.promise;
    console.log("✓ Successfully connected to MongoDB");
    return cached.conn;
  } catch (error) {
    cached.promise = null;

    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();

      // Provide specific error guidance
      if (
        errorMessage.includes("authentication") ||
        errorMessage.includes("auth")
      ) {
        console.error(
          "✗ Authentication Error: Check your MongoDB username/password in .env.local",
        );
        console.error("  - Ensure username and password match MongoDB Atlas");
        console.error(
          "  - Verify URL encoding of special characters (@, :, etc.)",
        );
      } else if (
        errorMessage.includes("enotfound") ||
        errorMessage.includes("ebadname")
      ) {
        console.error(
          "✗ DNS/Connection Error: Check your cluster URL and internet connection",
        );
      } else if (errorMessage.includes("timeout")) {
        console.error(
          "✗ Timeout Error: MongoDB is not responding. Check network access settings.",
        );
      } else {
        console.error("✗ MongoDB connection failed:", error.message);
      }

      throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    } else {
      console.error("✗ Unknown MongoDB connection error");
      throw error;
    }
  }
}
