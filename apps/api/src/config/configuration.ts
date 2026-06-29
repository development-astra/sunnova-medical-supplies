export default () => ({
  port: parseInt(process.env.PORT ?? '4000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET ?? 'change-me-access',
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'change-me-refresh',
    accessExpiresIn: '15m',
    refreshExpiresIn: '7d',
  },
  cookie: {
    domain: process.env.COOKIE_DOMAIN ?? 'localhost',
    secure: process.env.COOKIE_SECURE === 'true',
  },
  spaces: {
    endpoint: process.env.DIGITALOCEAN_SPACES_ENDPOINT,
    accessKey: process.env.DIGITALOCEAN_SPACES_ACCESS_KEY,
    secretKey: process.env.DIGITALOCEAN_SPACES_SECRET_KEY,
    bucket: process.env.DIGITALOCEAN_SPACES_BUCKET ?? 'sunnova-media',
    cdnUrl: process.env.DIGITALOCEAN_SPACES_CDN_URL,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  email: {
    from: process.env.EMAIL_FROM ?? 'orders@sunnovamedical.com',
    replyTo: process.env.EMAIL_REPLY_TO ?? 'isabella@sunnovamedical.com',
    resendKey: process.env.RESEND_API_KEY,
  },
});
