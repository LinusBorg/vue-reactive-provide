<template>
  <div>
    <Child/>
  </div>
</template>

<script>
import DynamicProvide from '#lib/mixins/DynamicProvide'
import Child from './Child'
export default {
  name: 'Props',
  components: {
    Child,
  },
  mixins: [
    DynamicProvide({
      name: 'test',
      props: true,
      attrs: ['title'],
    }),
  ],
  props: ['name', 'msg'],
}
</script>

<style scoped>
</style>
