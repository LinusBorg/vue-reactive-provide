<template>
  <div>
    <slot />
  </div>
</template>

<script>
import DynamicProvide from '#lib/mixins/DynamicProvide'

export default {
  name: 'TestMixin',
  props: ['msg', 'name', 'filter'],
  mixins: [
    DynamicProvide({
      name: 'test',
      props: true,
      include: ['items', 'filteredItems', 'someMethod'],
    }),
  ],
  data: () => ({
    items: ['Tom', 'Jerry', 'Jimmy', 'Torben'],
  }),
  computed: {
    filteredItems() {
      return this.items.filter(item => item.indexOf(this.filter) !== -1)
    },
  },
  methods: {
    someMethod(txt) {
      console.log(`Hello from the Child. Text: ${txt}`)
    },
  },
}
</script>

<style scoped>
</style>
