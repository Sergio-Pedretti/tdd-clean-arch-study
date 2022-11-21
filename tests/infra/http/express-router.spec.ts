import { Controller } from '@/application/controllers'
import { Response, Request } from 'express'
import { mock, MockProxy } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'

class ExpressRouter {
  constructor (private readonly controller: Controller) {}

  async adapt (req: Request, res: Response): Promise<void> {
    const httpResponse = await this.controller.handle({ ...req.body })
    res.status(200).json(httpResponse.data)
  }
}

describe('ExpressRouter', () => {
  let req: Request
  let res: Response
  let controller: MockProxy<Controller>
  let sut: ExpressRouter
  beforeEach(() => {
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: { data: 'any-data' }
    })
    sut = new ExpressRouter(controller)
  })

  it('should call handle with the correct params', async () => {
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
  })

  it('should call handle with undefined if body empty', async () => {
    const req = getMockReq()
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({})
  })

  it('should respond with 200 and valid data', async () => {
    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ data: 'any-data' })
  })
})
