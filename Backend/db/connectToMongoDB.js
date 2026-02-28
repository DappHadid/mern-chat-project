import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Berhasil terhubung ke MongoDB");
  } catch (error) {
    console.log("Koneksi MongoDB gagal:", error.message);
  }
};

export default connectToMongoDB;
