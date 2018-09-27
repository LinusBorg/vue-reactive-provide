<template>
  <div id="app">
    <label for="">
      name: <input type="text" v-model="name"> <br>
    </label>
    <label for="">
      Message: <input type="text" v-model="msg"> <br>
    </label>
    <label for="">
      Filter items: <input type="text" v-model="filter"> <br>
    </label>
    <hr>
    <div class="row">
      <TestMixin :name="name" :msg="msg" :filter="filter">
        <TestChild />
      </TestMixin>

      <TestOption :name="name" :msg="msg" :filter="filter">
        <TestChild />
      </TestOption>

      <TestMixin :name="name" :msg="msg" :filter="filter">
        <TestInherit />
      </TestMixin>
    </div>

  </div>
</template>

<script>
import TestChild from '#app/components/TestChild'
import TestInherit from '#app/components/TestInherit'
import TestMixin from '#app/components/TestMixin'
import TestOption from '#app/components/TestOption'

export default {
  name: 'app',
  components: {
    TestChild,
    TestInherit,
    TestMixin,
    TestOption,
  },
  data: () => ({
    name: 'Tom Jones',
    msg: 'This is a message',
    filter: '',
  }),
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.row {
  display: flex;
  justify-content: space-between;
}

.row > div {
  min-width: 300px;
  margin: auto;
}
</style>
