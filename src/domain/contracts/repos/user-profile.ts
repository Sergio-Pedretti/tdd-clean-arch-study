export interface SaveUserPicture {
  savePicture: (input: SaveUserPicture.Input) => Promise<void>
}

namespace SaveUserPicture {
  export type Input = { pictureUrl?: string }
}

export interface LoadUserPicture {
  load: (input: LoadUserPicture.Input) => Promise<void>
}

namespace LoadUserPicture {
  export type Input = { id: string }
}
