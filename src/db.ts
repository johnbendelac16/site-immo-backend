import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      autoSelectFamily: false,
    } as any)
    console.log("✅ MongoDB connecté")
  } catch (err) {
    console.error("❌ Erreur MongoDB:", err)
    process.exit(1)
  }
}
