<template>
  <div>
    <h2>Bravo</h2>
    <nuxt-link :to="{path: '/'}">Index</nuxt-link>
    <nuxt-link :to="{path: '/alpha'}">Alpha</nuxt-link>
    <div>
      <h3>From Remote</h3>
      <ul>
        <li
          v-for="key in translationKeys"
          :key="key"
        >
          <strong>{{key}}</strong>:&nbsp;<span>{{$t(key)}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      translationKeys: []
    }
  },
  async asyncData ({
    store
  }) {
    const locale = 'pt'
    await store.dispatch('hydrateTranslation', locale)
    const translations = await store.state.translations
    console.log('translations', translations)
    const translationKeys = Object.keys(translations)

    return {
      translationKeys
    }
  }
}
</script>