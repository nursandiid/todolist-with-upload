import express from 'express'
import todoController from '../controllers/todo.controller.js'

const todoRouter = express.Router()

todoRouter
  .get('/', todoController.getAll)
  .post('/', todoController.create)
  .get('/:todoId', todoController.get)
  .put('/:todoId', todoController.update)
  .delete('/:todoId', todoController.remove)
  .put('/:todoId/toggle', todoController.toggleCompleted)

export default todoRouter
