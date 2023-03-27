import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { PgUser } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { PgConnection } from '@/infra/postgres/helpers'

describe('User Routes', () => {
  let connection: PgConnection
  let backup: IBackup
  let pgUserRepo: Repository<PgUser>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgUser])
    pgUserRepo = connection.getRepository(PgUser)

    backup = db.backup()
  })

  beforeEach(() => {
    backup.restore()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('DELETE /users/picture', () => {
    it('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .delete('/api/users/picture')

      expect(status).toBe(403)
    })

    it('should return 200 with valid data', async () => {
      const { id } = await pgUserRepo.save({ email: 'any-email', name: 'Sérgio pedretti' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
        .delete('/api/users/picture')
        .set({ authorization })

      expect(status).toBe(200)
      expect(body).toEqual({ pictureUrl: undefined, initials: 'SP' })
    })
  })

  describe('PUT /users/picture', () => {
    const uploadSpy = jest.fn()

    jest.mock('@/infra/upload/aws-s3-file-storage', () => ({
      AwsS3FileStorage: jest.fn().mockReturnValue({
        upload: uploadSpy
      })
    }))

    it('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .put('/api/users/picture')

      expect(status).toBe(403)
    })

    it('should return 200 with valid data', async () => {
      uploadSpy.mockResolvedValueOnce('any-url')
      const { id } = await pgUserRepo.save({ email: 'any-email', name: 'Sérgio pedretti' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
        .put('/api/users/picture')
        .set({ authorization })
        .attach('picture', Buffer.from('any-buffer'), { filename: 'any-name', contentType: 'image/png' })

      expect(status).toBe(200)
      expect(body).toEqual({ pictureUrl: 'any-url', initials: undefined })
    })
  })
})
