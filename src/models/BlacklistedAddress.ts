import mongoose from 'mongoose'

const BlacklistedAddressSchema = new mongoose.Schema({
  address: { 
    type: String, 
    required: true,
    unique: true,
    index: true
  },
  network: {
    type: String,
    required: false, // Optional - can blacklist across all networks
  },
  reason: {
    type: String,
    required: false,
  },
  blacklistedBy: {
    type: String,
    required: false,
    default: 'admin'
  },
  blacklistedAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    required: false
  }
})

export default mongoose.models.BlacklistedAddress || mongoose.model('BlacklistedAddress', BlacklistedAddressSchema)

