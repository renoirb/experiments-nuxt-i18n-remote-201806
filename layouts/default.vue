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
      console.log('switchLocale this.$i18n.getLocaleMessage', this.$i18n.getLocaleMessage(localeName))
      const messages = {
        hello: `Hello in ${localeName}` // WIP!!
      }
      this.$store.dispatch('i18n/setLocale', localeName)
      this.$store.dispatch('i18n/setMessages', {...messages})
      console.log('switchLocale', localeName)
    }
  }
}
</script>
