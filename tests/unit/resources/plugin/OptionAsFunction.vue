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
  props: ['injectName'],
  data: () => ({
    msg: 'Testmessage',
  }),
  reactiveProvide() {
    return {
      name: this.$options.propsData.injectName,
      include: ['msg'],
    }
  },
}
</script>
