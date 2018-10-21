<template>
  <div>
    <Child/>
  </div>
</template>

<script>
import Child from './Child'
export default {
  name: 'Props',
  components: {
    Child,
  },
  reactiveProvide: {
    name: 'test',
    listeners: true,
  },
  props: ['name', 'msg'],
}
</script>

<style scoped>
</style>
