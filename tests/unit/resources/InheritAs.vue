<template>
  <div>
    <Child/>
  </div>
</template>

<script>
import DynamicProvide from '#lib/mixins/DynamicProvide'
import Basic from './Basic'
import Child from './Child'

export default {
  name: 'Props',
  components: {
    Basic,
    Child,
  },
  mixins: [
    DynamicProvide({
      name: 'test',
      inheritAs: '$test',
      include: {
        testInheritAs: 'testInheritAs', // adding
        coolMessage: 'message', // overwrite
      },
    }),
  ],
  data: () => ({
    testInheritAs: 'Test InheritAs',
    message: 'InheritAs message',
  }),
  computed: {
    coolMessage() {
      return this.message
    },
  },
}
</script>
