import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  detail: { type: String, required: true },
}, { timestamps: true })

export const Category = mongoose.model('Category', categorySchema)
