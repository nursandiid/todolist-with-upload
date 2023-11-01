import validate from '../validations/validation.js'
import {
  filterQueryParamsValidation,
  todoCreateValidation,
  todoIdValidation,
  todoToggleCompletedValidation,
  todoUpdateValidation,
} from '../validations/todo.validation.js'
import successResponse from '../responses/success.response.js'
import Todo from '../models/Todo.js'
import ErrorMsg from '../errors/message.error.js'

const getAll = async (req, res, next) => {
  try {
    const { is_completed, has_due_date } = validate(
      filterQueryParamsValidation,
      req.query,
      true
    )
    let queryParams = {}
    if (is_completed) {
      queryParams.is_completed = true
    }
    if (has_due_date) {
      queryParams.due_date = {
        $ne: null,
      }
    }

    const todos = await Todo.find(queryParams)

    return successResponse(res, todos)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const attributes = validate(todoCreateValidation, req.body)
    const todo = await Todo.create(attributes)

    return successResponse(res, todo, 'Created', 201)
  } catch (error) {
    next(error)
  }
}

const get = async (req, res, next) => {
  try {
    const todoId = validate(todoIdValidation, req.params.todoId)
    const todo = await Todo.findById(todoId)

    if (!todo) {
      throw new ErrorMsg(404, 'Todo is not found')
    }

    return successResponse(res, todo)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const validated = validate(todoUpdateValidation, req.body)
    const todoId = validate(todoIdValidation, req.params.todoId)

    let todo = await Todo.findById(todoId)
    if (!todo) {
      throw new ErrorMsg(404, 'Todo is not found')
    }

    await Todo.updateOne({ _id: todoId }, validated)

    todo = await Todo.findById(todoId)

    return successResponse(res, todo, 'Updated')
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const todoId = validate(todoIdValidation, req.params.todoId)

    const todo = await Todo.findById(todoId)
    if (!todo) {
      throw new ErrorMsg(404, 'Todo is not found')
    }

    await Todo.deleteOne({ _id: todoId })

    return successResponse(res, null, 'Deleted', 204)
  } catch (error) {
    next(error)
  }
}

const toggleCompleted = async (req, res, next) => {
  try {
    let is_completed = validate(
      todoToggleCompletedValidation,
      req.body.is_completed
    )
    const todoId = validate(todoIdValidation, req.params.todoId)

    let todo = await Todo.findById(todoId)
    if (!todo) {
      throw new ErrorMsg(404, 'Todo is not found')
    }

    await Todo.updateOne({ _id: todoId }, { is_completed })

    todo = await Todo.findById(todoId)

    return successResponse(res, todo, 'Updated')
  } catch (error) {
    next(error)
  }
}

export default {
  getAll,
  create,
  get,
  update,
  remove,
  toggleCompleted,
}
