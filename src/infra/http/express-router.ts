import { Controller } from '@/application/controllers'
import { RequestHandler, Request, Response } from 'express'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  const result = (req: Request, res: Response): void => {
    controller.handle({ ...req.body }).then((httpResponse) => {
      if (httpResponse.statusCode === 200) {
        res.status(200).json(httpResponse.data)
      } else {
        res.status(httpResponse.statusCode).json({ error: httpResponse.data.message })
      }
    }).catch((err) => {
      res.status(500).json({ error: err.data.message })
    })
  }
  return result
}
