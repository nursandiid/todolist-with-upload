import supertest from 'supertest'
import web from '../../src/applications/web.js'
import mongoose from '../../src/applications/database.js'
import {
  removeTestTodo,
  createTestTodo,
  getTestTodo,
  removeTestDummyUploads,
  createTestDummyUploads,
  getTestUpload,
  createTestUpload,
  removeTestUpload,
  removeTestDummyTodos,
} from '../utils.js'

afterAll(async () => {
  await mongoose.connection.close()
})

describe('GET /api/todos/:todoId/uploads', () => {
  beforeEach(async () => {
    await createTestTodo()
    await removeTestDummyUploads()
    await createTestDummyUploads()
  })

  afterEach(async () => {
    await removeTestTodo()
    await removeTestDummyUploads()
  })

  it('should can get all files by todoId', async () => {
    const todo = await getTestTodo()
    const result = await supertest(web).get(`/api/todos/${todo._id}/uploads`)

    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(10)
  })
})

describe('POST /api/todos/:todoId/uploads', () => {
  beforeEach(async () => {
    await createTestTodo()
    await removeTestUpload()
  })

  afterEach(async () => {
    await removeTestTodo()
    await removeTestUpload()
  })

  it('should can upload file attachment', async () => {
    const todo = await getTestTodo()
    const result = await supertest(web)
      .post(`/api/todos/${todo._id}/uploads`)
      .field({
        label: 'File 1',
      })
      .attach('filepath', process.cwd() + '/test/filetest/1.png') // full path

    expect(result.status).toBe(201)
    expect(result.body.data.label).toBe('File 1')
  })

  it('should reject upload file with invalid fields', async () => {
    const result = await supertest(web).post('/api/todos').field({
      label: 'File 1',
    })

    expect(result.status).toBe(422)
    expect(result.body.errors).toBeDefined()
  })
})

describe('PUT /api/todos/:todoId/uploads/uploadId', () => {
  beforeEach(async () => {
    await createTestTodo()
    await createTestUpload()
  })

  afterEach(async () => {
    await removeTestTodo()
    await removeTestUpload()
  })

  it('should can update spesific file upload by uploadId', async () => {
    const todo = await getTestTodo()
    const upload = await getTestUpload()
    const result = await supertest(web)
      .put(`/api/todos/${todo._id}/uploads/${upload.id}`)
      .field({
        label: 'File 1 updated',
      })
      .attach('filepath', process.cwd() + '/test/filetest/1.png') // full path

    expect(result.status).toBe(200)
    expect(result.body.data._id).toBe(upload._id.toString())
    expect(result.body.data.label).toBe('File 1 updated')
  })
})

describe('DELETE /api/todos/:todoId/uploads/uploadId', () => {
  beforeEach(async () => {
    await createTestTodo()
    await createTestUpload()
  })

  afterEach(async () => {
    await removeTestTodo()
    await removeTestUpload()
  })

  it('should can delete spesific file upload by uploadId', async () => {
    const todo = await getTestTodo()
    const upload = await getTestUpload()
    const result = await supertest(web).delete(
      `/api/todos/${todo._id}/uploads/${upload.id}`
    )

    expect(result.status).toBe(204)
    expect(result.body.data).toBeFalsy()
  })
})
