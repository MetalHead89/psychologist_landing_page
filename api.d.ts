// Auth
type TAuthLoginResponse = {
  accessToken: string,
  user: {
    id: string,
    name: string,
    role: string
  }
}

type TAuthLogin = (payload: { login: string; password: string }) => Promise<TAuthLoginResponse>
type TAuthLogout = () => Promise<unknown>
type TAuthRefresh = () => Promise<TAuthLoginResponse>

interface IAuthApi {
  login: TAuthLogin,
  logout: TAuthLogout,
  refresh: TAuthRefresh
}

// Profile
type TProfile = {
  login: string,
  name: string,
}

type TProfileRequest = TProfile & {  password: string }
type TProfileGet = () => Promise<TProfile>
type TProfileUpdate = (payload: TProfileRequest) => Promise<void>

interface IProfileApi {
  get: TProfileGet,
  update: TProfileUpdate
}

interface IApi {
  auth: IAuthApi,
  profile: IProfileApi
}

type TRequestError = {
  data?: {
    snackbarError: string,
    fieldErrors?: { [prop: string]: string[] }
  },
  message: string,
  stack: string,
  statusCode: number,
  statusMessage: string,
  url: string
}
