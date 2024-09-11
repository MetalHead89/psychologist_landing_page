// Cookie names
export const CMS_COOKIE_REFRESH = 'refresh_token'

// Local storage keys
export const CMS_LS_USER = 'user'
export const CMS_LS_ACCESS_TOKEN = 'access_token'

// Routes
export const CMS_ROUTE_DEFAULT = 'admin-profile'
export const CMS_ROUTE_LOGIN = 'admin-login'

// API Routes
export const API_ROUTE_LOGIN = '/api/admin/auth/login'
export const API_ROUTE_REFRESH = '/api/admin/auth/refresh'

// API Realms
export const API_REALMS = {
  api: 'api',
  cmsApi: 'cmsApi'
}

export const ANXIETY = [
  'relationship',
  'public_speaking_fear',
  'emotional_burnout',
  'losing_interest',
  'loss_loved_one',
  'professional_problems',
  'intrusive_thoughts',
  'mood_swings',
  'underestimated',
  'decline_performance',
  'socialization',
  'desire_harm_yourself',
  'despair'
] as const

export const FEEDBACK_TYPE = [
  'telegram',
  'viber',
  'whats_app',
  'email'
] as const
