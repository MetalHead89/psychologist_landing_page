import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

export const ArticleSchema = defineMongooseModel<TArticleModel>({
  name: 'Article',
  schema: {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    keywords: {
      type: String,
      default: ''
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: true
    },
    previewImageUrl: {
      type: String,
      default: ''
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
