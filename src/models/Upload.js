import mongoose from '../applications/database.js'

const uploadSchema = new mongoose.Schema({
  todo_id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Upload', uploadSchema)
