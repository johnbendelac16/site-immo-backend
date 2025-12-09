import express from "express"
import cors from "cors"
import path from "path"
import { connectDB } from "./db"
import propertiesRoutes from "./routes/properties"
import contactsRoutes from "./routes/contacts"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

// Connexion Mongo
connectDB()

// Routes API
app.use("/api", propertiesRoutes)
app.use("/api", contactsRoutes)

app.listen(3001, () => console.log("Backend Mongo: http://localhost:3001"))
