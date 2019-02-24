<template>
  <div>
    <Child />
  </div>
</template>

<script>
import ReactiveProvide from '#lib/mixins/ReactiveProvide'
import Child from './Child'
export default {
  name: 'Props',
  components: {
    Child,
  },
  mixins: [
    ReactiveProvide({
      name: 'test',
      listeners: true,
    }),
  ],
  props: ['name', 'msg'],
}
</script>

<style scoped></style>
