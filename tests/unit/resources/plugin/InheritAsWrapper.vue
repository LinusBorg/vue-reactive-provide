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
  reactiveProvide: {
    name: 'test',
    include: ['message', 'testWrapper'],
  },
  data: () => ({
    testWrapper: 'Test 123',
    message: 'Wrapper message',
  }),
}
</script>
