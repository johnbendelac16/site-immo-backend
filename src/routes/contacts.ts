import { Router } from "express"
import { ContactModel } from "../models/Contact"

const router = Router()

// POST /api/contact : créer un lead
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
    })
    res.json({ success: true, id: doc._id.toString() })
  } catch (err) {
    console.error("Erreur POST /api/contact:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

// GET /api/contact : lister les leads
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
        createdAt: l.createdAt,
      }))
    )
  } catch (err) {
    console.error("Erreur GET /api/contact:", err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

export default router
