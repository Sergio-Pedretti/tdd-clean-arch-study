export interface SaveUserProfile {
  savePicture: (input: SaveUserProfile.Input) => Promise<void>
}

namespace SaveUserProfile {
  export type Input = { pictureUrl?: string }
}
