import { UUIDGenerator } from '@/domain/contracts/crypto'

export class UniqueId {
  constructor (private readonly date: Date) {}
  uuid ({ key }: UUIDGenerator.Input): UUIDGenerator.Output {
    return key +
    '-' +
    this.date.getFullYear().toString() +
    (this.date.getMonth() + 1).toString().padStart(2, '0') +
    this.date.getDate().toString().padStart(2, '0') +
    this.date.getHours().toString().padStart(2, '0') +
    this.date.getMinutes().toString().padStart(2, '0') +
    this.date.getSeconds().toString().padStart(2, '0')
  }
}
