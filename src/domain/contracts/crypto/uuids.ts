export interface UUIDGenerator {
  uuid: (input: UUIDGenerator.Input) => UUIDGenerator.Output
}

namespace UUIDGenerator {
  export type Input = {
    key: string
  }
  export type Output = string
}
