import { Controller } from '@/application/controllers'
import { Response, Request, RequestHandler, NextFunction } from 'express'
import { mock, MockProxy } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { adaptExpressRoute } from '@/infra/http/express-router'

describe('ExpressRouter', () => {
  let req: Request
  let res: Response
  let controller: MockProxy<Controller>
  let next: NextFunction
  let sut: RequestHandler
  beforeEach(() => {
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    next = getMockRes().next
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: { data: 'any-data' }
    })
    sut = adaptExpressRoute(controller)
  })

  it('should call handle with the correct params', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
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
