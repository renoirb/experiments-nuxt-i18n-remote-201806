<template>
  <div id="root">
    <h1>{{ $t('welcome') }}</h1>
    <section>
      <nuxt />
    </section>
    <div>
      <p>as link</p>
      <nuxt-link
        v-for="locale in $i18n.locales"
        v-if="locale.code !== $i18n.locale"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >
        {{ locale.name }}&nbsp;
      </nuxt-link>
    </div>
    <div>
      <p>as button</p>
      <button
        v-for="locale in $i18n.locales"
        v-if="locale.code !== $i18n.locale"
        :key="locale.code"
        @click="switchLocale(locale.code)"
      >
        {{ locale.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async switchLocale (localeName) {
      const localeMessage = this.$i18n.getLocaleMessage(localeName)
      // console.log('experiment: WIP switchLocale this.$i18n.getLocaleMessage', {...localeMessage})
      const remoteMessage = await this.$axios.get(`/sc/translations/${localeName}.json`).then(recv => recv.data)
      // console.log('experiment: WIP switchLocale this.$axios.get(...)', {...remoteMessage})

      const messages = {
        hello: `Hello in ${localeName}`, // WIP!!
        ...localeMessage,
        ...remoteMessage
      }
      console.log('experiment: WIP switchLocale', localeName, {...messages})
      // this.$set(this.$i18n.messages, localeName, {...messages})
      // this.$i18n.mergeLocaleMessage(localeName, messages)
      // this.$store.dispatch('i18n/setLocale', localeName)
      // this.$store.dispatch('i18n/setMessages', {...messages})
    }
  }
}
</script>
