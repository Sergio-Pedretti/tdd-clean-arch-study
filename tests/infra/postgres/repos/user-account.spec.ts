import { PgUserAccountRepository, PgRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import { PgConnection } from '@/infra/postgres/helpers'

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let connection: PgConnection
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb()
    backup = db.backup()
    pgUserRepo = connection.getRepository(PgUser)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserAccountRepository()
  })

  it('should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('load', () => {
    it('Should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'any-email' })

      const account = await sut.load({ email: 'any-email' })

      expect(account).toEqual({ id: '1' })
    })

    it('Should return an undefined if email does not exists', async () => {
      const account = await sut.load({ email: 'any-email' })

      expect(account).toBeUndefined()
    })
  })

  describe('SaveWithFacebook', () => {
    it('should create an account if id its undefined', async () => {
      await sut.saveWithFacebook({
        facebookId: '1',
        name: 'any-name',
        email: 'any-email'
      })

      const pgUser = await pgUserRepo.findOne({ email: 'any-email' })

      expect(pgUser?.id).toBe(1)
    })

    it('should update account if id is defined', async () => {
      await pgUserRepo.save({
        email: 'any-email',
        name: 'any-name',
        facebookId: 'any-fb-id'
      })

      await sut.saveWithFacebook({
        id: '1',
        facebookId: 'new-fb-id',
        name: 'new-name',
        email: 'new-email'
      })

      const pgUser = await pgUserRepo.findOne({ id: 1 })

      expect(pgUser).toMatchObject({
        id: 1,
        facebookId: 'new-fb-id',
        name: 'new-name',
        email: 'any-email'
      })
    })
  })
})
