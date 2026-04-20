import mongoose from "mongoose";

let connectionPromise = null;

export const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    const uri = process.env.MONGO_DB_URL;
    if (!uri) {
      throw new Error("MONGO_DB_URL is not set");
    }

    // Fail fast instead of hanging + buffering timeouts.
    mongoose.set("bufferCommands", false);
    connectionPromise = mongoose
      .connect(uri, {
        dbName: "PropertyDb",
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 20000,
      })
      .then((m) => {
        console.log("db connected");
        return m.connection;
      })
      .catch((err) => {
        connectionPromise = null;
        console.log("failed to connect with database");
        console.log(err);
        throw err;
      });
  }

  return connectionPromise;
};
