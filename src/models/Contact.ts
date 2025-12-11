// models/Contact.ts
import mongoose from "mongoose"

export interface IContact {
  name: string
  email?: string
  phone?: string
  city?: string          // ancien champ simple
  budget?: string
  message?: string

  // nouveaux champs
  source?: string        // "form-projet-home", "contact-final", "property-page"...
  projectType?: string   // "achat", "location", "vente", etc.
  timeline?: string      // "urgent", "3 mois", date libre...
  cities?: string        // texte libre : "Tel Aviv, Jérusalem"
}

const contactSchema = new mongoose.Schema<IContact>(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    city: String,
    budget: String,
    message: String,
    source: String,
    projectType: String,
    timeline: String,
    cities: String,
  },
  { timestamps: true }
)

export const ContactModel =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema)
