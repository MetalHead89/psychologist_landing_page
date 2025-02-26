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

// Feedback

type TAddFeedbackRequestData = {
  name: string,
  rating: number,
  feedback: string
}

type TFeedbackModel = {
  id: string,
  name: string,
  createdAt: Date,
  rating: number,
  feedback: string,
  isForModeration?: boolean,
  isShowed?: boolean
}

type TAddFeedback = (payload: {
  name: string,
  rating: number,
  feedback: string
}) => Promise<void>

type TGetFeedbacks = (params?: { status: string} ) => Promise<TFeedbackModel[]>
type TUpdateFeedback = (
  id: string,
  payload: {
    name?: string,
    rating?: number,
    feedback?: string,
    isForModeration?: boolean,
    isShowed?: boolean
  }) => Promise<TFeedbackModel>
  type TGetAllowedReviews = () => Promise<TFeedbackModel[]>

// Articles
type TArticleModel = {
  id: string,
  name: string,
  slug: string,
  content: string,
  createdAt: Date,
  description: string,
  keywords: string,
  title: string,
  isActive: boolean,
  previewImage: string
  previewImageUrl: string
}

type TArticlePayload = {
  id?: string,
  name?: string,
  content?: string,
  description?: string,
  keywords?: string,
  isActive?: boolean,
  previewImage?: string,
  slug?: string
}

type TArticlesListResponse = {
  articles: TArticleModel[],
} & TPaginationData

type TPublicListArticleModel = {
  id: string,
  name: string,
  slug: string,
  previewText: string,
  createdAt: string,
  previewImageUrl: string
}

type TPublicArticlesListResponse = {
  articles: TPublicListArticleModel[],
} & TPaginationData

interface IArticlesApi {
  getList: (params?: { page: number, perPage: number }) => Promise<TArticlesListResponse>,
  newImage: ({ base64Image: string }) => Promise<{ imageUrl: string }>,
  create: (payload: TArticlePayload) => Promise<TArticleModel>,
  update: (payload: TArticlePayload) => Promise<TArticleModel>,
  get: (id: string) => Promise<TArticleModel>
  delete: (id: string) => Promise<void>
  getPublicList: (params?: { page: number, perPage: number }) => Promise<TPublicArticlesListResponse>,
  getPublicArticle: (slug: string) => Promise<TArticleModel>
}

interface IFeedbackApi {
  add: TAddFeedback,
  get: TGetFeedbacks,
  update: TUpdateFeedback,
  getAllowedReviews: TGetAllowedReviews
}

interface IApi {
  auth: IAuthApi,
  profile: IProfileApi,
  feedback: IFeedbackApi,
  articles: IArticlesApi
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
