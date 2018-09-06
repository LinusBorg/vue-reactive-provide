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
  dynamicProvide: {
    name: 'test',
    include: ['msg'],
  },
  data: () => ({
    msg: 'Testmessage',
  }),
}
</script>
