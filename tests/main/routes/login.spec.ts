import { app } from '@/main/config/app'
import { PgUser } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { UnauthorizationError } from '@/application/erros'

import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'
import request from 'supertest'

describe('Login Routes', () => {
  describe('POST /login/facebook', () => {
    let backup: IBackup
    const loadUserApi = jest.fn()
    jest.mock('@/infra/apis/facebook', () => ({
      FacebookApi: jest.fn().mockReturnValue({
        loadUser: loadUserApi
      })
    }))

    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
    })

    beforeEach(() => {
      backup.restore()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    it('it should return 200 with AccessToken', async () => {
      loadUserApi.mockResolvedValueOnce({ facebookId: 'any-id', name: 'any-name', email: 'any-email' })

      const { status, body } = await request(app)
        .post('/api/login/facebook')
        .send({ token: 'valid_token' })

      expect(status).toBe(200)
      expect(body.accessToken).toBeDefined()
    })

    it('it should return 401 with UnauthorizedError', async () => {
      const { status, body } = await request(app)
        .post('/api/login/facebook')
        .send({ token: 'invalid_token' })

      expect(status).toBe(401)
      expect(body.error).toBe(new UnauthorizationError().message)
    })
  })
})
