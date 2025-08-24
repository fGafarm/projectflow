// lib/config.ts
export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'ProjectFlow',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    env: process.env.NEXT_PUBLIC_APP_ENV || 'development',
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  security: {
    sessionTimeout: Number(process.env.NEXT_PUBLIC_SESSION_TIMEOUT) || 3600000, // 1時間
    maxLoginAttempts: Number(process.env.NEXT_PUBLIC_MAX_LOGIN_ATTEMPTS) || 5,
    loginAttemptsWindow: Number(process.env.NEXT_PUBLIC_LOGIN_ATTEMPTS_WINDOW) || 900000, // 15分
    lockoutDuration: Number(process.env.NEXT_PUBLIC_LOCKOUT_DURATION) || 900000, // 15分
  },
  features: {
    enableExport: process.env.NEXT_PUBLIC_ENABLE_EXPORT === 'true',
    enable2FA: process.env.NEXT_PUBLIC_ENABLE_2FA === 'true',
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
};