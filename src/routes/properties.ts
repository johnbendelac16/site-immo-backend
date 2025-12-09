import { Router } from "express"
import { PropertyModel } from "../models/Property"

const router = Router()

// GET /api/proprietes
router.get("/proprietes", async (req, res) => {
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
  type: p.type,
  status: p.status,
  tags: p.tags,
}))

    res.json(properties)
  } catch (err) {
    console.error("Erreur GET /api/proprietes:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

// POST /api/proprietes
// POST /api/proprietes
router.post("/proprietes", async (req, res) => {
  try {
    const {
      title,
      price,
      city,
      image,
      rooms,
      area,
      floor,
      hasParking,
      description,
      type,
      status,
      tags,
    } = req.body

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
      type: type || "appartement",
      status: status || "a_vendre",
      tags: Array.isArray(tags)
        ? tags
        : typeof tags === "string"
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
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
      type: doc.type,       // ✅ ajouter
      status: doc.status,   // ✅ ajouter
      tags: doc.tags,       // ✅ ajouter
    })
  } catch (err) {
    console.error("Erreur POST /api/proprietes:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

// DELETE /api/proprietes/:id
router.delete("/proprietes/:id", async (req, res) => {
  try {
    await PropertyModel.deleteOne({ _id: req.params.id })
    res.json({ success: true })
  } catch (err) {
    console.error("Erreur DELETE /api/proprietes/:id:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

export default router
