import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    cpf:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    requests: {
        type: [String],
        required: false,
        default: [],
    },
    contract: {
        type: [String],
        required: false,
        default: [],
    }
  },
 
)

export default mongoose.model('User', userSchema)
