// See node_modules/nuxt-i18n/src/templates/middleware.js
export default function ({ app, req, res, params, route, store, redirect, isHMR }) {
  console.log('bravo: middleware/i18n')
  const defaultLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // Get locale from params
  const locale = params.lang || defaultLocale
  console.log('bravo: middleware/i18n, locale is ', locale)
}
