<template>
  <div>
    <h2>Index</h2>
    <p>{{ $t('loadedfrom', { from }) }}</p>
    <nuxt-link :to="{path: '/alpha'}">Alpha</nuxt-link>
    <nuxt-link :to="{path: '/bravo'}">Bravo</nuxt-link>
    <div>
      <h3>Using translation formatters</h3>
      <h4>{{ $t('howmany', { what }) }} <button @click="add(what)">{{ $t('add') }}</button></h4>
      <p>{{ $t('ownhowmany') }} <strong>{{ $tc(what, count, { count }) }}</strong></p>
      <p>Count is {{ count }}</p>
    </div>
    <div>
      <h4>{{ $t('cutedog') }}</h4>
      <img :src="dog" />
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
      from: '',
    }
  },
  computed: mapState({
    count: state => state.count,
    dog: state => state.dog,
  }),
  asyncData () {
    return {
      from: process.static ? 'static' : (process.server ? 'server' : 'client'),
    }
  },
  async fetch ({
    store,
  }) {
    await store.dispatch('hydrateDog')
  },
  methods: {
    async add (what) {
      await this.$store.dispatch('countPlusOne')
    },
  },
}
</script>
