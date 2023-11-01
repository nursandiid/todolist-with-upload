import multer from 'multer'
import { v4 as uuid } from 'uuid'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/uploads')
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    const filename = `${uuid()}.${ext}`

    cb(null, filename)
  },
})

/**
 *
 * @param {string[]} ignoredMimeTypes
 * @returns {multer.Multer}
 */
const upload = (ignoredMimeTypes) => {
  if (!ignoredMimeTypes) {
    ignoredMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/pdf',
    ]
  }

  return multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (!ignoredMimeTypes.includes(file.mimetype)) {
        cb(new Error('Invalid file type'))
        return
      }
      
      cb(null, true)
    },
  })
}

export default upload
