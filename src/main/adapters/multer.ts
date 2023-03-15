
import { RequestHandler } from 'express'
import { ServerError } from '@/application/erros'

import multer from 'multer'

export const adaptMulter: RequestHandler = (req, res, next) => {
  const upload = multer().single('picture')
  upload(req, res, error => {
    if (error !== undefined) {
      return res.status(500).json({ error: new ServerError(error).message })
    }
    if (req.file !== undefined) {
      req.locals = { ...req.locals, file: { buffer: req.file.buffer, mimetype: req.file.mimetype } }
    }
    next()
  })
}
