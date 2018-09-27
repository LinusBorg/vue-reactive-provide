<template>
  <div>
    <child ref="child" />
  </div>
</template>

<script>
import DynamicProvide from '#lib/mixins/DynamicProvide'
import Child from './Child'
export default {
  components: {
    Child,
  },
  mixins: [
    DynamicProvide({
      name: 'test',
      include: ['msg'],
    }),
  ],
  data: () => ({
    msg: 'Testmessage',
  }),
}
</script>
