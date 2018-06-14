<template>
  <div>
    <h2>Alpha</h2>
    <nuxt-link :to="{path: '/'}">Index</nuxt-link>&nbsp;
    <nuxt-link :to="{path: '/bravo'}">Bravo</nuxt-link>
    <h3>Samples</h3>
    <div>
      <h3>Translating using curly</h3>
      <p>{{ $t('hello') }}</p>
      <h3>Translating using v-t attribute</h3>
      <p v-t="'world'" />
      <h3>Translating using v-html attribute</h3>
      <p><span v-html="$t('hello')" /></p>
      <h3>Translating using v-html attribute, and argument</h3>
      <p><span v-html="$tc('howmany', { what: 'apples' })" />?</p>
      <p><span v-t="'iown'" />&nbsp;<strong>{{ $tc(what, count, { count }) }}</strong></p>
      <h3>Translating using v-html attribute, argument and pluralization </h3>
      <p><span v-html="$tc('apple', count, { count })" /></p>
    </div>
    <div>
      <p>Also testing how <em>vue-i18n</em> handles missing keys</p>
      <p>
        <!-- do i18n.missing sees key testingMissingKeysTextPleaseDoNotTranslate ? -->
        {{ $t('testingMissingKeysTextPleaseDoNotTranslate') }}
      </p>
    </div>
  </div>
</template>

<script>
import {
  mapState,
} from 'vuex'
export default {
  data () {
    return {
      what: 'apple', // Make part of VueX to experiment about this
    }
  },
  computed: mapState({
    count: state => state.count,
  }),
}
</script>
