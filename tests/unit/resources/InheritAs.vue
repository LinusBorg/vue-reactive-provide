<template>
  <div>
    <Child/>
  </div>
</template>

<script>
import ReactiveProvide from '#lib/mixins/ReactiveProvide'
import Basic from './Basic'
import Child from './Child'

export default {
  name: 'Props',
  components: {
    Basic,
    Child,
  },
  mixins: [
    ReactiveProvide({
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
