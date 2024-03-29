import { adaptExpressRoute } from '@/main/adapters'
import { Controller } from '@/application/controllers'
import { Response, Request, RequestHandler, NextFunction } from 'express'
import { mock, MockProxy } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'

describe('ExpressRouter', () => {
  let req: Request
  let res: Response
  let controller: MockProxy<Controller>
  let next: NextFunction
  let sut: RequestHandler

  beforeAll(() => {
    req = getMockReq({ body: { anyBody: 'any-body' }, locals: { anyLocals: 'any-locals' } })
    res = getMockRes().res
    next = getMockRes().next
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: { data: 'any-data' }
    })
  })

  beforeEach(() => {
    sut = adaptExpressRoute(controller)
  })

  it('should call handle with the correct params', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ anyBody: 'any-body', anyLocals: 'any-locals' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with undefined if body empty', async () => {
    const req = getMockReq()
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should respond with 200 and valid data', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ data: 'any-data' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with 204 and empty data', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 204,
      data: null
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(null)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with 400 and invalid data', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 400,
      data: new Error('any-error')
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any-error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with 500 and invalid data', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('any-error')
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any-error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
