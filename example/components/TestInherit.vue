<template>
  <div>
    <TestChild/>
  </div>
</template>

<script>
import TestChild from './TestChild'
import ReactiveProvide from '#lib/mixins/ReactiveProvide'

export default {
  name: 'testInherit',
  components: {
    TestChild,
  },
  mixins: [
    ReactiveProvide({
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
