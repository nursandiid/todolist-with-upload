import supertest from 'supertest'
import web from '../../src/applications/web.js'
import mongoose from '../../src/applications/database.js'
import {
  removeTestTodo,
  createTestDummyTodos,
  removeTestDummyTodos,
  createTestTodo,
  getTestTodo,
} from '../utils.js'

afterAll(async () => {
  await mongoose.connection.close()
})

describe('GET /api/todos', () => {
  beforeEach(async () => {
    await createTestDummyTodos()
  })

  afterEach(async () => {
    await removeTestDummyTodos()
  })

  it('should can get all todos', async () => {
    const result = await supertest(web).get('/api/todos')

    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(10)
  })
})

describe('POST /api/todos', () => {
  beforeEach(async () => {
    await removeTestTodo()
  })
  
  afterEach(async () => {
    await removeTestTodo()
  })

  it('should can create new todo', async () => {
    const now = new Date()
    const dueDate = new Date().setDate(now.getDate() + 1)

    const result = await supertest(web).post('/api/todos').send({
      todo: 'Todo 1',
      due_date: dueDate,
      is_completed: false,
    })

    expect(result.status).toBe(201)
    expect(result.body.data.todo).toBe('Todo 1')
  })

  it('should reject create new todo with invalid fields', async () => {
    const result = await supertest(web).post('/api/todos').send({
      todo: '',
      is_completed: false,
    })

    expect(result.status).toBe(422)
    expect(result.body.errors).toBeDefined()
  })
})

describe('GET /api/todos/:todoId', () => {
  beforeEach(async () => {
    await createTestTodo()
  })

  afterEach(async () => {
    await removeTestTodo()
  })

  it('should can get spesific todo by todoId', async () => {
    const todo = await getTestTodo()
    const result = await supertest(web).get('/api/todos/' + todo._id)

    expect(result.status).toBe(200)
    expect(result.body.data._id).toBe(todo._id.toString())
    expect(result.body.data.todo).toBe('Todo 1')
  })

  it('should reject get todo with invalid todoId ', async () => {
    const todo = await getTestTodo()
    await removeTestTodo()

    const result = await supertest(web).get('/api/todos/' + todo._id)

    expect(result.status).toBe(404)
    expect(result.body.message).toBe('Todo is not found')
  })

  it('should reject get todo with invalid format of todoId object', async () => {
    const result = await supertest(web).get('/api/todos/format-id-salah')

    expect(result.status).toBe(422)
  })
})

describe('PUT /api/todos/:todoId', () => {
  beforeEach(async () => {
    await createTestTodo()
  })

  afterEach(async () => {
    await removeTestTodo()
  })

  it('should can update spesific todo by todoId', async () => {
    const todo = await getTestTodo()
    const result = await supertest(web)
      .put('/api/todos/' + todo._id)
      .send({
        todo: 'Todo 1 updated'
      })

    expect(result.status).toBe(200)
    expect(result.body.data._id).toBe(todo._id.toString())
    expect(result.body.data.todo).toBe('Todo 1 updated')
  })

  it('should reject update spesific todo with invalid todoId', async () => {
    const todo = await getTestTodo()
    await removeTestTodo()

    const result = await supertest(web)
      .put('/api/todos/' + todo._id)
      .send({
        todo: 'Todo 1 updated'
      })

    expect(result.status).toBe(404)
    expect(result.body.message).toBe('Todo is not found')
  })
  
  it('should reject update spesific todo with invalid fields', async () => {
    const todo = await getTestTodo()
    const result = await supertest(web)
      .put('/api/todos/' + todo._id)
      .send({
        todo: ''
      })

    expect(result.status).toBe(422)
    expect(result.body.errors).toBeDefined()
  })
})

describe('DELETE /api/todos/:todoId', () => {
  beforeEach(async () => {
    await createTestTodo()
  })

  afterEach(async () => {
    await removeTestTodo()
  })

  it('should can delete spesific todo by todoId', async () => {
    const todo = await getTestTodo()
    const result = await supertest(web)
      .delete('/api/todos/' + todo._id)

    expect(result.status).toBe(204)
    expect(result.body.data).toBeFalsy()
  })

  it('should reject delete spesific todo with invalid todoId', async () => {
    const todo = await getTestTodo()
    await removeTestTodo()

    const result = await supertest(web)
      .delete('/api/todos/' + todo._id)

    expect(result.status).toBe(404)
    expect(result.body.message).toBe('Todo is not found')
  })
})
