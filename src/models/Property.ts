import mongoose from "mongoose"

export interface IProperty {
  title: string
  price: string
  city: string
  image: string
  rooms?: number
  area?: number
  floor?: number
  hasParking?: boolean
  description?: string
  type?: string          // appartement, penthouse, maison...
  status?: string        // a_vendre, a_louer, sous_offre, vendu
  tags?: string[]        // ["investissement", "proche mer"...]
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
  type: { type: String, default: "appartement" },         // valeur par défaut
  status: { type: String, default: "a_vendre" },          // valeur par défaut
  tags: { type: [String], default: [] },                  // tableau de tags
})

export const PropertyModel =
  mongoose.models.Property || mongoose.model<IProperty>("Property", propertySchema)
