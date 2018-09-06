<template>
  <div>
    <Child/>
  </div>
</template>

<script>
import DynamicProvide from '@/mixins/DynamicProvide'
import Child from './Child'
export default {
  name: 'Props',
  components: {
    Child,
  },
  mixins: [
    DynamicProvide({
      name: 'test',
      listeners: true,
    }),
  ],
  props: ['name', 'msg'],
}
</script>

<style scoped>
</style>
