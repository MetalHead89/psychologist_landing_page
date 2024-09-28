import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

export const FeedbackSchema = defineMongooseModel<TFeedbackModel>({
  name: 'Feedback',
  schema: {
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    feedback: {
      type: String,
      required: true
    },
    isForModeration: {
      type: Schema.Types.Boolean,
      default: true
    },
    isShowed: {
      type: Schema.Types.Boolean,
      default: false
    }
  },
  options: {
    toJSON: {
      transform: (_, item) => {
        const { _id, __v, ...newItem } = item
        return { ...newItem, id: _id }
      }
    }
  }
})
