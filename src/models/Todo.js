import mongoose from '../applications/database.js'

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
    min: 3,
  },
  due_date: Date,
  is_completed: Boolean,
})

export default mongoose.model('Todo', TodoSchema)
