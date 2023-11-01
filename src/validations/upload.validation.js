import Joi from 'joi'

const uploadCreateValidation = Joi.object({
  label: Joi.string().required().min(3),
  filepath: Joi.string().required()
})

const uploadUpdateValidation = Joi.object({
  label: Joi.string().required().min(3)
})

const uploadIdValidation = Joi.string().required().length(24).label('uploadId')

export { uploadCreateValidation, uploadUpdateValidation, uploadIdValidation }
