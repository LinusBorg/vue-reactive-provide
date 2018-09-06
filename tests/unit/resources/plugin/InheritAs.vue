<template>
  <div>
    <Child/>
  </div>
</template>

<script>
import Basic from './Basic'
import Child from './Child'

export default {
  name: 'Props',
  components: {
    Basic,
    Child,
  },
  dynamicProvide: {
    name: 'test',
    inheritAs: '$test',
    include: {
      testInheritAs: 'testInheritAs', // adding
      coolMessage: 'message', // overwrite
    },
  },
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
