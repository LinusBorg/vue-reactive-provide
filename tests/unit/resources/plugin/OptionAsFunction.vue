<template>
  <div>
    <child ref="child" />
  </div>
</template>

<script>
// import DynamicProvide from '@/mixins/DynamicProvide'
import Child from './Child'
export default {
  components: {
    Child,
  },
  props: ['injectName'],
  data: () => ({
    msg: 'Testmessage',
  }),
  dynamicProvide() {
    return {
      name: this.$options.propsData.injectName,
      include: ['msg'],
    }
  },
}
</script>
