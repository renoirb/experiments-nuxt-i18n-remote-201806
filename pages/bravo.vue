<template>
  <div>
    <h2>Bravo</h2>
    <nuxt-link :to="{path: '/'}">Index</nuxt-link>
    <nuxt-link :to="{path: '/alpha'}">Alpha</nuxt-link>
    <div>
      <h3>From Remote, in {{ locale }}</h3>
      <ul>
        <li
          v-for="key in messagesKeys"
          :key="key"
        >
          <strong>{{key}}</strong>:&nbsp;<span>{{$t(key)}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('i18n')
export default {
  computed: {
    ...mapGetters([
      'messagesKeys',
      'locale'
    ])
  },
  beforeMount () {
    this.$store.commit('i18n/ENABLE_MESSAGES_STORE')
    const localeFallback = 'pt'
    const locale = this.locale.length === 2 ? this.locale : localeFallback
    console.log('bravo at beforeMount', locale)
  },
  async mounted () {
    // Enable store i18n/messages for this view
    const locale = this.locale
    await this.$store.dispatch('i18n/switchLocale', locale)
    console.log('bravo at mounted', locale)
  }
}
</script>