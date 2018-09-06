<template>
  <div>
    <InheritAs>
      <Child/>
    </InheritAs>
  </div>
</template>

<script>
import DynamicProvide from '@/mixins/DynamicProvide'
import InheritAs from './InheritAs'
import Child from './Child'
export default {
  name: 'Props',
  components: {
    Child,
    InheritAs,
  },
  mixins: [
    DynamicProvide({
      name: 'test',
      include: ['message', 'testWrapper'],
    }),
  ],
  data: () => ({
    testWrapper: 'Test 123',
    message: 'Wrapper message',
  }),
}
</script>
