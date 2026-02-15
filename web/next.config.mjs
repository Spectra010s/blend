import withSerwistInit from '@serwist/next';

// Vercel automatically provides VERCEL_GIT_COMMIT_SHA during build.
// We use this for stable caching, falling back to a random ID only if needed.
const revision = process.env.VERCEL_GIT_COMMIT_SHA || crypto.randomUUID();

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  // Disable in development to avoid "cache hell"
  disable: process.env.NODE_ENV === 'development',
  additionalPrecacheEntries: [{ url: '/~offline', revision }],
});

export default withSerwist({});
