export interface SaveUserPicture {
  savePicture: (input: SaveUserPicture.Input) => Promise<void>
}

namespace SaveUserPicture {
  export type Input = { pictureUrl?: string, initials?: string }
}

export interface LoadUserPicture {
  load: (input: LoadUserPicture.Input) => Promise<LoadUserPicture.Output>
}

namespace LoadUserPicture {
  export type Input = { id: string }
  export type Output = { name?: string }
}
