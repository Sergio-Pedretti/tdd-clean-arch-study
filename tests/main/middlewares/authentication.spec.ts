import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { auth } from '@/main/middlewares'
import { ForbiddenError } from '@/application/erros'

import { sign } from 'jsonwebtoken'
import request from 'supertest'

describe('Login Routes', () => {
  const authorization = sign({ key: 'any-user-id' }, env.jwtSecret)

  it('should return 403 if authorization header its not provided', async () => {
    app.get('/fake_route', auth)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(403)
    expect(body.error).toBe(new ForbiddenError().message)
  })

  it('should return 200 if authorization header is valid', async () => {
    app.get('/fake_route', auth, (req, res) => {
      res.json(req.locals)
    })

    const { status, body } = await request(app)
      .get('/fake_route')
      .set({ authorization })

    expect(status).toBe(200)
    expect(body).toEqual({
      userId: 'any-user-id'
    })
  })
})
