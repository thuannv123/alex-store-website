import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Dadabase Connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/thuannv0602`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
