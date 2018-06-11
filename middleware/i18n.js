// See node_modules/nuxt-i18n/src/templates/middleware.js
export default function ({ app, req, res, params, route, store, redirect, isHMR }) {
  const defaultLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // Get locale from params
  const locale = params.lang || defaultLocale
  console.log('experiment: middleware/i18n (our own), locale is ', locale)
}
