<template>
  <div id="root">
    <h1><span v-t="'welcome'" /></h1>
    <div>
      <button
        v-for="locale in $i18n.locales"
        :key="locale.iso"
        @click="switchLocale(locale.iso)"
      >
        {{ locale.name }}
      </button>
      &nbsp;&mdash;&nbsp;
      <button
        @click="enableMissingStore"
      >
        Enable Missing Store
      </button>
    </div>
    <hr />
    <section>
      <h1><span v-t="'welcome'" /></h1>
      <nuxt />
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    async switchLocale (localeName) {
      await this.$store.dispatch('i18n/switchLocale', localeName)
    },
    enableMissingStore (localeName) {
      this.$store.commit('i18n/ENABLE_MISSING_STORE')
    },
  },
}
</script>
