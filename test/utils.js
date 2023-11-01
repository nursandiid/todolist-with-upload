import Todo from '../src/models/Todo'

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

export {
  createTestTodo,
  removeTestTodo,
  getTestTodo,
  createTestDummyTodos,
  removeTestDummyTodos,
}
