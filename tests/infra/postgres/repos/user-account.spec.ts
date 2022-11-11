import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { IBackup } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'

describe('PgUserAccountRepository', () => {
  describe('load', () => {
    let sut: PgUserAccountRepository
    let pgUserRepo: Repository<PgUser>
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb()
      backup = db.backup()
      pgUserRepo = getRepository(PgUser)
    })

    beforeEach(() => {
      backup.restore()
      sut = new PgUserAccountRepository()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    it('Should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'existing-email' })

      const account = await sut.load({ email: 'existing-email' })

      expect(account).toEqual({ id: '1' })
    })

    it('Should return an undefined if email does not exists', async () => {
      const account = await sut.load({ email: 'existing-email' })

      expect(account).toBeUndefined()
    })
  })
})
