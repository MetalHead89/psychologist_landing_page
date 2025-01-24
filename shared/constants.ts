const STORAGE_KEY_PREFIX = 'cms_psychology_'

// Cookie names
export const CMS_COOKIE_REFRESH = `${STORAGE_KEY_PREFIX}refresh_token`

// Local storage keys
export const CMS_LS_ACCESS_TOKEN = `${STORAGE_KEY_PREFIX}access_token`

// Routes
export const CMS_ROUTE_LOGIN = 'admin-login'
export const CMS_ROUTE_FEEDBACKS = 'admin-feedbacks'
export const CMS_ROUTE_DEFAULT = CMS_ROUTE_FEEDBACKS

// API Routes
export const API_ROUTE_LOGIN = '/api/admin/auth/login'
export const API_ROUTE_REFRESH = '/api/admin/auth/refresh'

// API Realms
export const API_REALMS = {
  api: 'api',
  cmsApi: 'cmsApi'
}

// Roles
export const ROLES = {
  admin: 'admin'
}

export const ROLES_NAMES = {
  [ROLES.admin]: 'Администратор'
}

export const FEEDBACK_FILTERS = {
  all: 'all',
  forModeration: 'forModeration',
  approved: 'approved',
  rejected: 'rejected'
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
  // 'viber',
  'whats_app',
  'email'
] as const

export enum TABLE_ACTIONS {
  edit
}

export const UPLOADS_DIR = 'uploads'
export const BREAKPOINTS = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1920
}

export const DEFAULT_IMAGE_SIZES = '320 xs:480 sm:768 md:1024 lg:1920'
