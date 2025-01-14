// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAnyObject = { [prop: string]: any }
type TUserModel = {
  id: string,
  name: string,
  role: string,
  password: string
}
type TUser = {
  id: string,
  name: string,
  role: string
}

type TFeedbackData = {
  name: string,
  age: number | null,
  anxiety: string[],
  anxietyDescription?: string,
  answerTarget: string,
  phone?: string,
  email?: string,
  consentProcessing: boolean
}

type TSelectSelectedSlotProps = {
  search: string,
  values: TAnyObject[],
  isOpen: boolean
}

type TPaginationData = {
  page: number,
  totalItems: number,
  totalPages: number,
  perPage: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function ym(metrikaId: string, method: string, ...args: any): void
declare module 'swiper'
declare module 'swiper/modules'
declare module 'body-scroll-lock'
