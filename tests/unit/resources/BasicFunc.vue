<template>
  <div>
    <child ref="child" />
  </div>
</template>

<script>
import ReactiveProvide from '#lib/mixins/ReactiveProvide'
import Child from './Child'
export default {
  components: {
    Child,
  },
  mixins: [
    ReactiveProvide({
      name: 'test',
      include: vm => [vm.fieldName],
    }),
  ],
  data: () => ({
    fieldName: 'msg',
    msg: 'Testmessage',
  }),
}
</script>
