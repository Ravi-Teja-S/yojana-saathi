import mongoose from 'mongoose'

const SchemeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },

  name: String,
  description: String,
  pdfFile: String,

  eligibility: String,
  benefit: String,

  fullDetails: String,
  applicationProcess: String,
  contactInfo: String,
})

export default mongoose.models.Scheme ||
  mongoose.model('Scheme', SchemeSchema, 'schemes_collection')