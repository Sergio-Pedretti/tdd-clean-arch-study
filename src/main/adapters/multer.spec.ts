import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { mocked } from 'ts-jest/utils'

import multer from 'multer'
import { ServerError } from '@/application/erros'

jest.mock('multer')

const adaptMulter: RequestHandler = (req, res, next) => {
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

describe('MulterAdapter', () => {
  let uploadSpy: jest.Mock
  let singleSpy: jest.Mock
  let multerSpy: jest.Mock

  let sut = adaptMulter
  let req: Request
  let res: Response
  let next: NextFunction
  let fakeMulter: jest.Mocked<typeof multer>

  beforeAll(() => {
    singleSpy = jest.fn().mockImplementation(() => uploadSpy)
    multerSpy = jest.fn().mockImplementation(() => ({ single: singleSpy }))

    res = getMockRes().res
    next = getMockRes().next
    fakeMulter = multer as jest.Mocked<typeof multer>
    mocked(fakeMulter).mockImplementation(multerSpy)
  })

  beforeEach(() => {
    uploadSpy = jest.fn().mockImplementation((req, res, next) => {
      req.file = { buffer: Buffer.from('any-buffer'), mimetype: 'any-type' }
      next()
    })
    req = getMockReq({ locals: { anyLocals: 'any-locals' } })
    sut = adaptMulter
  })

  it('should call single upload with correct input', () => {
    sut(req, res, next)

    expect(multerSpy).toHaveBeenCalledWith()
    expect(multerSpy).toHaveBeenCalledTimes(1)
    expect(singleSpy).toHaveBeenCalledWith('picture')
    expect(singleSpy).toHaveBeenCalledTimes(1)
    expect(uploadSpy).toHaveBeenCalledWith(req, res, expect.any(Function))
    expect(uploadSpy).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if upload fails', () => {
    const error = new Error('multer_error')
    uploadSpy = jest.fn().mockImplementationOnce((req, res, next) => {
      next(error)
    })

    sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: new ServerError(error).message })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should not add file to req.locals', () => {
    uploadSpy = jest.fn().mockImplementationOnce((req, res, next) => {
      next()
    })

    sut(req, res, next)

    expect(req.locals).toEqual({ anyLocals: 'any-locals' })
  })

  it('should add file to req.locals', () => {
    sut(req, res, next)

    expect(req.locals).toEqual({
      anyLocals: 'any-locals',
      file: {
        buffer: req.file?.buffer,
        mimetype: req.file?.mimetype
      }
    })
  })

  it('should call next on success', () => {
    sut(req, res, next)

    expect(next).toHaveBeenCalledWith()
    expect(next).toHaveBeenCalledTimes(1)
  })
})
