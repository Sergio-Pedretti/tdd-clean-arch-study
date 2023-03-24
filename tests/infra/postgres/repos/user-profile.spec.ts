import { PgRepository, PgUserProfileRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { IBackup } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'

describe('PgUserProfileRepository', () => {
  let sut: PgUserProfileRepository
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb()
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserProfileRepository()
  })

  afterAll(async () => {
    await getConnection().close()
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
