
import { PgUserProfileRepository } from '@/infra/postgres/repos'

export const makePgUserProfileRepo = (): PgUserProfileRepository => {
  return new PgUserProfileRepository()
}
