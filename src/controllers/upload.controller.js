import express from 'express'
import validate from '../validations/validation.js'
import {
  uploadCreateValidation,
  uploadIdValidation,
  uploadUpdateValidation,
} from '../validations/upload.validation.js'
import { todoIdValidation } from '../validations/todo.validation.js'
import successResponse from '../responses/success.response.js'
import Todo from '../models/Todo.js'
import Upload from '../models/Upload.js'
import ErrorMsg from '../errors/message.error.js'
import { removeFileInStorage } from '../utils.js'

const todoIdMustExists = async (req, res, next) => {
  try {
    const todoId = validate(todoIdValidation, req.params.todoId)
    const todo = await Todo.findById(todoId)
    if (!todo) {
      throw new ErrorMsg(404, 'Todo is not found')
    }

    return todoId
  } catch (error) {
    next(error)
  }
}

const getByTodoId = async (req, res, next) => {
  try {
    const todoId = todoIdMustExists(req.params.todoId)

    const uploads = await Upload.find({
      todo_id: todoId,
    })

    return successResponse(res, uploads)
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const create = async (req, res, next) => {
  try {
    const { label } = validate(uploadCreateValidation, req.body)
    const todoId = todoIdMustExists(req.params.todoId)

    const upload = await Upload.create({
      todo_id: todoId,
      label,
      filepath: `/${req.file.path}`,
    })

    return successResponse(res, upload, 'Created', 201)
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const update = async (req, res, next) => {
  try {
    const { label } = validate(uploadUpdateValidation, req.body)
    todoIdMustExists(req.params.todoId)
    const uploadId = validate(uploadIdValidation, req.params.uploadId)

    let upload = await Upload.findById(uploadId)
    if (!upload) {
      throw new ErrorMsg(404, 'Upload is not found')
    }

    const attributes = {
      label,
    }

    if (req.file) {
      await removeFileInStorage(upload.filepath)
      attributes.filepath = `/${req.file.path}`
    }

    await Upload.updateOne({ _id: uploadId }, attributes)

    upload = await Upload.findById(uploadId)

    return successResponse(res, upload, 'Updated')
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    todoIdMustExists(req.params.todoId)
    const uploadId = validate(uploadIdValidation, req.params.uploadId)

    let upload = await Upload.findById(uploadId)
    if (!upload) {
      throw new ErrorMsg(404, 'Upload is not found')
    }

    await Upload.deleteOne({ _id: uploadId })
    removeFileInStorage(upload.filepath)

    return successResponse(res, null, 'Deleted', 204)
  } catch (error) {
    next(error)
  }
}

export default {
  getByTodoId,
  create,
  update,
  remove,
}
