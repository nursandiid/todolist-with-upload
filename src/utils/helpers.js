import fs from 'fs'

const removeFileInStorage = async (filepath = '') => {
  filepath = `./${filepath}`

  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath)
    return true
  }

  return false
}

export { removeFileInStorage }
