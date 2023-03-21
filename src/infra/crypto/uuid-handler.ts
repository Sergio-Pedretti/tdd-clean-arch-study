import { UUIDGenerator } from '@/domain/contracts/crypto'
import { v4 } from 'uuid'

export class UUIDHandler {
  uuid ({ key }: UUIDGenerator.Input): UUIDGenerator.Output {
    return `${key}-${v4()}`
  }
}
