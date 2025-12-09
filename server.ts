import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

// 🔹 Connexion MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "", {
    autoSelectFamily: false,
  } as any)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err))

// 🔹 Schéma + modèle
interface IProperty {
  title: string
  price: string
  city: string
  image: string
  rooms?: number
  area?: number
  floor?: number
  hasParking?: boolean
  description?: string
}

const propertySchema = new mongoose.Schema<IProperty>({
  title: { type: String, required: true },
  price: { type: String, default: "Prix sur demande" },
  city: { type: String, default: "Non spécifié" },
  image: { type: String, default: "" },
  rooms: { type: Number, default: 0 },
  area: { type: Number, default: 0 },
  floor: { type: Number, default: 0 },
  hasParking: { type: Boolean, default: false },
  description: { type: String, default: "" },
})

const PropertyModel = mongoose.model<IProperty>("Property", propertySchema)

interface IContact {
  name: string
  email: string
  phone?: string
  city?: string
  budget?: string
  message?: string
}

const contactSchema = new mongoose.Schema<IContact>(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    city: String,
    budget: String,
    message: String,
  },
  { timestamps: true }
)

const ContactModel = mongoose.model<IContact>("Contact", contactSchema)

// 🔹 GET: liste des biens
app.get("/api/proprietes", async (req, res) => {
  try {
    const docs = await PropertyModel.find().sort({ _id: -1 })
    const properties = docs.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      price: p.price,
      city: p.city,
      image: p.image,
      rooms: p.rooms,
      area: p.area,
      floor: p.floor,
      hasParking: p.hasParking,
      description: p.description,
    }))
    res.json(properties)
  } catch (err) {
    console.error("Erreur GET /api/proprietes:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

// 🔹 POST: création d’un bien
app.post("/api/proprietes", async (req, res) => {
  try {
    const { title, price, city, image, rooms, area, floor, hasParking, description } = req.body

    const doc = await PropertyModel.create({
      title,
      price: price || "Prix sur demande",
      city: city || "Non spécifié",
      image: image || "",
      rooms: rooms || 0,
      area: area || 0,
      floor: floor || 0,
      hasParking: !!hasParking,
      description: description || "",
    })

    res.json({
      id: doc._id.toString(),
      title: doc.title,
      price: doc.price,
      city: doc.city,
      image: doc.image,
      rooms: doc.rooms,
      area: doc.area,
      floor: doc.floor,
      hasParking: doc.hasParking,
      description: doc.description,
    })
  } catch (err) {
    console.error("Erreur POST /api/proprietes:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

// 🔹 DELETE: suppression d’un bien
app.delete("/api/proprietes/:id", async (req, res) => {
  try {
    await PropertyModel.deleteOne({ _id: req.params.id })
    res.json({ success: true })
  } catch (err) {
    console.error("Erreur DELETE /api/proprietes/:id:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

app.listen(3001, () => console.log("Backend Mongo: http://localhost:3001"))


// 🔹 POST: créer un lead de contact
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, city, budget, message } = req.body
    const doc = await ContactModel.create({
      name,
      email,
      phone,
      city,
      budget,
      message,
    })
    res.json({ success: true, id: doc._id.toString() })
  } catch (err) {
    console.error("Erreur POST /api/contact:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

// (optionnel) 🔹 GET: liste des leads (uniquement pour toi)
app.get("/api/contact", async (req, res) => {
  try {
    const leads = await ContactModel.find().sort({ createdAt: -1 })
    res.json(
      leads.map((l: any) => ({
        id: l._id.toString(),
        name: l.name,
        email: l.email,
        phone: l.phone,
        city: l.city,
        budget: l.budget,
        message: l.message,
        createdAt: l.createdAt,
      }))
    )
  } catch (err) {
    console.error("Erreur GET /api/contact:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})
