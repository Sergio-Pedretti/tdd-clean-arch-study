import { PgRepository, PgUserProfileRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import { PgConnection } from '@/infra/postgres/helpers'

describe('PgUserProfileRepository', () => {
  let connection: PgConnection
  let sut: PgUserProfileRepository
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb()
    backup = db.backup()
    pgUserRepo = connection.getRepository(PgUser)
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserProfileRepository()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('savePicture', () => {
    it('Should update user profile', async () => {
      const { id } = await pgUserRepo.save({ email: 'any-email', initials: 'any-initials' })

      await sut.savePicture({ id: id.toString(), pictureUrl: 'any-url' })

      const pgUser = await pgUserRepo.findOne({ id })

      expect(pgUser).toMatchObject({ id, pictureUrl: 'any-url', initials: null })
    })
  })

  describe('loadProfile', () => {
    it('Should load user profile', async () => {
      const { id } = await pgUserRepo.save({ email: 'any-email', name: 'any-name' })

      const pgUser = await sut.load({ id: id.toString() })

      expect(pgUser?.name).toBe('any-name')
    })

    it('Should load user profile', async () => {
      const { id } = await pgUserRepo.save({ email: 'any-email' })

      const pgUser = await sut.load({ id: id.toString() })

      expect(pgUser?.name).toBeUndefined()
    })

    it('Should return undefined', async () => {
      const userProfile = await sut.load({ id: '1' })

      expect(userProfile).toBeUndefined()
    })
  })
})
