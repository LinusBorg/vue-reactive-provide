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
  dynamicProvide: {
    name: 'test',
    props: true,
    attrs: ['title'],
  },
  props: ['name', 'msg'],
}
</script>

<style scoped>
</style>
