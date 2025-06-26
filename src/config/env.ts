// Simple environment configuration
export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  APP_NAME: 'Mentoring Platform',
  isDev: process.env.NODE_ENV === 'development',
} as const 