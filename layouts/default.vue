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
      this.$store.dispatch('i18n/switchLocale', localeName)
    },
  },
}
</script>
