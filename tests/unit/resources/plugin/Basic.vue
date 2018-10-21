<template>
  <div>
    <child ref="child" />
  </div>
</template>

<script>
// import ReactiveProvide from '#lib/mixins/ReactiveProvide'
import Child from './Child'
export default {
  components: {
    Child,
  },
  reactiveProvide: {
    name: 'test',
    include: ['msg'],
  },
  data: () => ({
    msg: 'Testmessage',
  }),
}
</script>
