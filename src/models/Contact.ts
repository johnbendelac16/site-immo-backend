import mongoose from "mongoose"

export interface IContact {
  name: string
  email?: string
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

export const ContactModel =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema)
