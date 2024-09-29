import { FEEDBACK_FILTERS } from '@/shared/constants'

export default defineEventHandler(async event => {
  try {
    const { status } = getQuery(event)
    const params = {} as Record<string, unknown>

    switch (status) {
      case FEEDBACK_FILTERS.forModeration:
        params.isForModeration = true
        break
      case FEEDBACK_FILTERS.approved:
        params.isShowed = true
        break
      case FEEDBACK_FILTERS.rejected:
        params.isShowed = false
        params.isForModeration = false
        break
    }

    return (
      await FeedbackSchema.find(params)
        .sort({ createdAt: -1 }))
      .map(item => item.toJSON()
      )
  }
  catch (error) {
    createRequestError(error)
  }
})
