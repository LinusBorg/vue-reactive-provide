<template>
  <div>
    <TestChild/>
  </div>
</template>

<script>
import TestChild from './TestChild'
import DynamicProvide from '#lib/mixins/DynamicProvide'

export default {
  name: 'testInherit',
  components: {
    TestChild,
  },
  mixins: [
    DynamicProvide({
      name: 'test',
      inheritAs: 'testFromParent',
      include: {
        capitalizedMessage: 'msg',
      },
    }),
  ],
  computed: {
    capitalizedMessage() {
      return this.testFromParent.msg.toUpperCase()
    },
  },
}
</script>

<style scoped>
</style>
