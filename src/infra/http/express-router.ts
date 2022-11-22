import { Controller } from '@/application/controllers'
import { RequestHandler, Request, Response } from 'express'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  const result = (req: Request, res: Response): void => {
    controller.handle({ ...req.body })
      .then(({ statusCode, data }) => {
        const json = statusCode === 200 ? data : { error: data.message }
        res.status(statusCode).json(json)
      })
      .catch(() => undefined)
  }
  return result
}
