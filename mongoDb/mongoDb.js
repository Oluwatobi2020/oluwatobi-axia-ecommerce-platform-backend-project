import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("Error connecting to MongoDB", err.message);
  }
};

export default connectDB
