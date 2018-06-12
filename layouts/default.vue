<template>
  <div id="root">
    <h1>{{ $t('welcome') }}</h1>
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

    <section>
      <nuxt />
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    async switchLocale (localeName) {
     const normalizedLocaleName = localeName.toLowerCase()
      const localeMessage = this.$i18n.getLocaleMessage(localeName)
      console.log('experiment: WIP switchLocale this.$i18n.getLocaleMessage', {...localeMessage})
      const remoteMessage = await this.$axios.get(`/hpi/translations/${normalizedLocaleName}.json`).then(recv => recv.data)
      console.log('experiment: WIP switchLocale this.$axios.get(...)', {...remoteMessage})

      const messages = {
        hello: `Hello in ${normalizedLocaleName}`, // WIP!!
        ...localeMessage,
        ...remoteMessage
      }
      console.log('experiment: WIP switchLocale this.$i18n.getLocaleMessage', normalizedLocaleName, {...messages})
      // this.$set(this.$i18n.messages, normalizedLocaleName, {...messages})
      this.$i18n.mergeLocaleMessage(normalizedLocaleName, messages)
      // this.$store.dispatch('i18n/setLocale', normalizedLocaleName)
      // this.$store.dispatch('i18n/setMessages', {...messages})
    }
  }
}
</script>
