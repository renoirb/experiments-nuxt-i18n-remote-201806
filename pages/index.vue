<template>
  <div>
    <p>Hi this is index {{ $t('hello') }}</p>
    <img :src="dog" />
  </div>
</template>

<script>
export default {
  data: () => ({
    dog: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTA'
  }),
  async asyncData({ app }) {
    const { data: { message: dog } } = await app.$axios.get('/dog')
    console.log('asyncData done', dog)
    return {
      dog
    }
  }
}
</script>
<style>
img {
  border: 1px solid red;
}
</style>