// routes/contacts.ts
import { Router } from "express"
import { ContactModel } from "../models/Contact"

const router = Router()

// ✅ NOUVELLE ROUTE GÉNÉRIQUE
router.post("/leads", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      city,
      budget,
      message,
      source,
      projectType,
      timeline,
      cities,
    } = req.body

    if (!name || !phone) {
      return res.status(400).json({ error: "name et phone sont obligatoires" })
    }

    const doc = await ContactModel.create({
      name,
      email,
      phone,
      city,
      budget,
      message,
      source,
      projectType,
      timeline,
      cities,
    })

    res.json({
      success: true,
      id: doc._id.toString(),
    })
  } catch (err) {
    console.error("Erreur POST /api/leads:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

// 🔁 L’ANCIENNE ROUTE RESTE TELLE QUELLE POUR L’INSTANT
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, city, budget, message } = req.body
    const doc = await ContactModel.create({
      name,
      email,
      phone,
      city,
      budget,
      message,
      source: "legacy-contact", // petit tag pour savoir d’où ça vient
    })
    res.json({ success: true, id: doc._id.toString() })
  } catch (err) {
    console.error("Erreur POST /api/contact:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

// GET /api/contact : on renvoie aussi les nouveaux champs
router.get("/contact", async (req, res) => {
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
        source: l.source,
        projectType: l.projectType,
        timeline: l.timeline,
        cities: l.cities,
        createdAt: l.createdAt,
      }))
    )
  } catch (err) {
    console.error("Erreur GET /api/contact:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

export default router
