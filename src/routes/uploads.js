import express from 'express'
import uploadController from '../controllers/upload.controller.js'
import upload from '../applications/upload.js'

const uploadRouter = express.Router()

uploadRouter
  .route('/:todoId/uploads')
  .get(uploadController.getByTodoId)
  .post(upload().single('filepath'), uploadController.create)

uploadRouter
  .route('/:todoId/uploads/:uploadId')
  .put(upload().single('filepath'), uploadController.update)
  .delete(uploadController.remove)

export default uploadRouter
