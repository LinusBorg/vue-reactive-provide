<template>
  <div>
    <InheritAs>
      <Child/>
    </InheritAs>
  </div>
</template>

<script>
import InheritAs from './InheritAs'
import Child from './Child'
export default {
  name: 'Props',
  components: {
    Child,
    InheritAs,
  },
  dynamicProvide: {
    name: 'test',
    include: ['message', 'testWrapper'],
  },
  data: () => ({
    testWrapper: 'Test 123',
    message: 'Wrapper message',
  }),
}
</script>
