// See node_modules/nuxt-i18n/src/templates/middleware.js
export default async function ({
  app,
  // req,
  // res,
  params,
  // route,
  store,
  // redirect,
  isHMR
}) {
  console.log('loading-order: middleware/i18n')
  const fallbackLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // Get locale from params
  const currentLocale = await store.getters['i18n/locale']
  const locale = currentLocale || fallbackLocale
  console.log('loading-order: middleware/i18n, we are not in Hot-Module Replacement, locale is ', locale)
}
