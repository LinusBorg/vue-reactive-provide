<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TestOption',
  reactiveProvide: {
    name: 'test',
    props: true,
    include: ['items', 'filteredItems', 'someMethod'],
  },
  props: ['msg', 'name', 'filter'],
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
