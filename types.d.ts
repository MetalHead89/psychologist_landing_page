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
  email?: string
}

type TSelectSelectedSlotProps = {
  search: string,
  values: TAnyObject[],
  isOpen: boolean
}
