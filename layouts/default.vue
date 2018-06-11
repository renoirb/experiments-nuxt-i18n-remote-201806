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
    switchLocale (localeName) {
      // mergeLocaleMessage
      const updated = this.$i18n.getLocaleMessage(localeName)
      const messages = {
        hello: `Hello in ${localeName}`, // WIP!!
        ...updated
      }
      console.log('experiment: switchLocale this.$i18n.getLocaleMessage', {...messages})
      this.$set(this.$i18n.messages, localeName, {...messages})
      // this.$store.dispatch('i18n/setLocale', localeName)
      // this.$store.dispatch('i18n/setMessages', {...messages})
      console.log('experiment: switchLocale', localeName)
    }
  }
}
</script>
