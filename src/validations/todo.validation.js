import Joi from 'joi'

const todoCreateValidation = Joi.object({
  todo: Joi.string().required().min(3),
  due_date: Joi.date().optional(),
  is_completed: Joi.bool().optional(),
})

const todoUpdateValidation = Joi.object({
  todo: Joi.string().required().min(3),
  due_date: Joi.date().optional(),
  is_completed: Joi.bool().optional(),
})

const todoIdValidation = Joi.string().required().length(24).label('todoId')

export { todoCreateValidation, todoUpdateValidation, todoIdValidation }
