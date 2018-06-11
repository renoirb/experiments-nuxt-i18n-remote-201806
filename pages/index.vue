<template>
  <div>
    <div>
      <h3>Translating using curly</h3>
      <p>{{ $t('hello') }}</p>
      <h3>Translating using v-t attribute</h3>
      <p v-t="'world'" />
      <h3>Translating using v-html attribute</h3>
      <p><span v-html="$t('hello')" /></p>
      <h3>Translating using v-html attribute, and argument</h3>
      <p><span v-html="$t('howmany', { what: 'apples' })" />?</p>
      <p><span v-t="'iown'" />&nbsp;<strong>{{ $tc(what, count, { count }) }}</strong></p>
      <h3>Translating using v-html attribute, argument and pluralization </h3>
      <p><span v-html="$tc('apple', count, { count })" /></p>
    </div>
    <div>
      <h3>From remote</h3>
      <ul>
        <li
          v-for="key in translations"
          :key="key"
        >
          <strong>{{key}}</strong>:&nbsp;<span>{{$t(key)}}</span>
        </li>
      </ul>
    </div>
    <div>
      <h3>{{ $t('howmany', { what }) }} <button @click="add(what)">{{ $t('add') }}</button></h3>
      <p>{{ $t('ownhowmany') }} <strong>{{ $tc(what, count, { count }) }}</strong></p>
      <p>Count is {{ count }}</p>
    </div>
    <div>
      <h3>Remotely loaded?</h3>
      <p><button v-t="'btn_Start'" /></p>
    </div>
    <div>
      <h3>{{ $t('cutedog') }}</h3>
      <img :src="dog" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      what: 'apple',
      count: 0,
      dog: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTA',
      translations: []
    }
  },
  async asyncData ({ app }) {
    const { data: { message: dog } } = await app.$axios.get('/dog')
    const translations = await app.$axios.get(`/hpi/translations/en.json`).then(recv => Object.keys(recv.data))

    return {
      dog,
      translations
    }
  },
  methods: {
    add (what) {
      ++this.count
    }
  }
}
</script>
