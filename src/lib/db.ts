
import mongoose from "mongoose";
import { MongoClient, Db } from "mongodb";
import { DB_NAME } from "@/constants/mongodb";

const MONGODB_URL = process.env.NEXT_PUBLIC_MONGODB_URL as string;

if (!MONGODB_URL) {
  console.log("Environment variable NEXT_PUBLIC_MONGODB_URL is not defined");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const mongoClient = async (): Promise<Db> => {
  if (cachedDb && cachedClient) return cachedDb;

  const client = new MongoClient(MONGODB_URL);
  await client.connect();
  cachedClient = client;
  cachedDb = client.db(DB_NAME);
  console.log("MongoClient connected");

  return cachedDb;
};

// Prevent Mongoose multiple connections in dev
let mongooseConnection: typeof mongoose | null = null;

const connectDB = async (): Promise<void> => {
  if (mongooseConnection) return;

  try {
    mongooseConnection = await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
    console.log("Mongoose connected");
  } catch (error) {
    console.error("Mongoose connection error:", error);
    process.exit(1);
  }
};

export { connectDB, mongoClient };
