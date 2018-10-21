<template>
  <div>
    <p>
      Msg: {{ test.msg }} <br>
      Name: {{ test.name }} <br>
    </p>
    <hr>
    <pre>
      items: {{ test.items }}
      filteredItems: {{ test.filteredItems }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'TestChild',
  inject: ['test'],
  mounted() {
    this.test.someMethod('123 Test! <mounted>')
  },
  updated() {
    this.test.someMethod('123 Test! <updated>')
  },
}
</script>

<style scoped>
</style>
