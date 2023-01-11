import { ForbiddenError } from '@/application/erros'
import { app } from '@/main/config/app'
import { auth } from '@/main/middlewares'
import request from 'supertest'

describe('Login Routes', () => {
  it('should return 403 if authorization header its not provided', async () => {
    app.get('/fake_route', auth)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(403)
    expect(body.error).toBe(new ForbiddenError().message)
  })
})
