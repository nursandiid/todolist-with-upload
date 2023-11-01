import Todo from '../src/models/Todo'
import Upload from '../src/models/Upload'

const createTestTodo = async () => {
  await Todo.create({
    todo: 'Todo 1',
    is_completed: false,
  })
}

const removeTestTodo = async () => {
  await Todo.deleteOne({ todo: 'Todo 1' })
}

const getTestTodo = async () => {
  return await Todo.findOne({
    todo: 'Todo 1',
  })
}

const createTestDummyTodos = async () => {
  let todos = []
  for (let i = 1; i <= 10; i++) {
    todos.push({
      todo: `Todo ${i}`,
      is_completed: false,
    })
  }

  await Todo.insertMany(todos)
}

const removeTestDummyTodos = async () => {
  await Todo.deleteMany({})
}

const createTestDummyUploads = async () => {
  const todo = await getTestTodo()
  let uploads = []
  for (let i = 1; i <= 10; i++) {
    uploads.push({
      todo_id: todo._id,
      label: `File ${i}`,
      filepath: `/storage/uploads/dummy-${i}.png`,
    })
  }

  await Upload.insertMany(uploads)
}

const removeTestDummyUploads = async () => {
  await Upload.deleteMany({})
}

const createTestUpload = async () => {
  const todo = await getTestTodo()
  await Upload.create({
    todo_id: todo._id,
    label: `File 1`,
    filepath: `/storage/uploads/dummy-1.png`,
  })
}

const removeTestUpload = async () => {
  await Upload.deleteOne({ label: `File 1` })
}

const getTestUpload = async () => {
  return await Upload.findOne({ label: 'File 1' })
}

export {
  createTestTodo,
  removeTestTodo,
  getTestTodo,
  createTestDummyTodos,
  removeTestDummyTodos,
  createTestDummyUploads,
  removeTestDummyUploads,
  createTestUpload,
  removeTestUpload,
  getTestUpload
}
