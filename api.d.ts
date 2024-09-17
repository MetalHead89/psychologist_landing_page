type TUserData = {
  id: string,
  name: string,
  role: string
}

// Auth
type TAuthLoginResponse = {
  accessToken: string,
  userData: TUserData
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
type TProfileGet = () => Promise<TUser>
type TProfileUpdate = (payload: { name?: string; password?: string, retryPassword?: string }) => Promise<TUserData>

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
    snackbarErrors: string[],
    fieldErrors?: { [prop: string]: string[] }
  },
  message: string,
  stack: string,
  statusCode: number,
  statusMessage: string,
  url: string
}
