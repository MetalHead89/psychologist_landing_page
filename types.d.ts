// type TAnyObject = { [prop: string]: string }

// type TFeedbackData = {
//   name: string,
//   email: string,
//   appealReason: string
// }

type TAnyObject = { [prop: string]: any }

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

declare function ym(metrikaId: string, method: string, ...args: any): void
declare module 'swiper'
declare module 'swiper/modules'
