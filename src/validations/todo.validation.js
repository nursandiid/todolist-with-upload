import Joi from 'joi'

const todoCreateValidation = Joi.object({
  todo: Joi.string().required().min(3),
  due_date: Joi.date().optional(),
})

const todoUpdateValidation = Joi.object({
  todo: Joi.string().required().min(3),
  due_date: Joi.date().optional(),
})

const todoIdValidation = Joi.string().required().length(24).label('todoId')

const todoToggleCompletedValidation = Joi.number()
  .required()
  .min(0)
  .max(1)
  .label('is_completed')

const filterQueryParamsValidation = Joi.object({
  is_completed: Joi.number().optional().min(0).max(1),
  has_due_date: Joi.number().optional().min(0).max(1),
})

export {
  todoCreateValidation,
  todoUpdateValidation,
  todoIdValidation,
  todoToggleCompletedValidation,
  filterQueryParamsValidation
}
