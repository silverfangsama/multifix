import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const AdminSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  accessToken: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
})

// Hash password before saving
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// Method to compare password
AdminSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

