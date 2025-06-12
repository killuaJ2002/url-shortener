import express from "express";
import urlRoutes from "./routes/urlRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
const mongoUrl = process.env.MONGODB_URL;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit if DB connection fails
  }
};
app.use(express.json());

app.use("/api", urlRoutes);

connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
  });
});
