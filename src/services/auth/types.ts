export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type UserType = {
  id: string
  email: string
  name: string
  isEmailVerified: boolean
  avatar: string
}

export type ProfileData = {
  avatar?: File
  name?: string
  email?: string
}

export type LoginResponse = {
  accessToken: string
}
