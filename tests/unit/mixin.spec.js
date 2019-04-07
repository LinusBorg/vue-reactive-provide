import { mount } from '@vue/test-utils'
const testProd = !!process.env.VUE_APP_TEST_PROD

jest.mock('#lib/utils/warn')

const ReactiveProvide = testProd
  ? require('../../dist/VueReactiveProvide.common').ReactiveProvideMixin
  : require('../../lib').ReactiveProvideMixin

describe('Mixin functionality', () => {
  it('creates correct component options', () => {
    const mixin = ReactiveProvide({
      name: 'test',
      include: [],
    })

    expect(mixin).toMatchObject({
      beforeCreate: expect.any(Function),
      provide: expect.any(Function),
      computed: {
        test: expect.any(Function),
      },
      watch: {
        test: {
          immediate: true,
          handler: expect.any(Function),
        },
      },
    })
    expect(mixin).toMatchSnapshot()
  })

  it('when no name property is provided, cancels and logs error', () => {
    // Test relying on a mock can't work when testing pro build
    if (testProd) return

    const warn = require('#lib/utils/warn.js')

    const mixin = ReactiveProvide({
      name: undefined,
      inheritAs: '$test',
      include: [],
    })

    expect(mixin).toBe(undefined)
    expect(warn.warn).toHaveBeenCalled()
    // jest.unmock('#lib/utils/warn')
  })

  it('created correct component options with `inheritAs`', () => {
    const mixin = ReactiveProvide({
      name: 'test',
      inheritAs: '$test',
      include: [],
    })

    expect(mixin).toMatchObject({
      beforeCreate: expect.any(Function),
      provide: expect.any(Function),
      computed: {
        test: expect.any(Function),
      },
      inject: {
        $test: { from: 'test', default: {} },
      },
      watch: {
        test: {
          immediate: true,
          handler: expect.any(Function),
        },
      },
    })
    expect(mixin).toMatchSnapshot()
  })

  it('Basic: provides a working injection to a child component', () => {
    const wrapper = mount(require('./resources/Basic.vue').default)

    const child = wrapper.find({ name: 'child' })

    expect(child.vm.test).toMatchObject({
      msg: 'Testmessage',
    })
  })

  it('Func: provides working injection when `include` is a function', () => {
    const wrapper = mount(require('./resources/BasicFunc.vue').default)

    const child = wrapper.find({ name: 'child' })

    expect(child.vm.test).toMatchObject({
      msg: 'Testmessage',
    })
  })

  it('Props/Attrs: provides props & attrs', () => {
    const wrapper = mount(require('./resources/Props.vue').default, {
      propsData: {
        name: 'Test',
        msg: 'Hello',
      },
      attrs: {
        title: 'Title',
      },
    })

    const child = wrapper.find({ name: 'child' })

    expect(child.vm.test).toMatchObject({
      name: 'Test',
      msg: 'Hello',
      title: 'Title',
    })
  })

  it('Listeners: provides callbacks', () => {
    const handler = () => {}
    const wrapper = mount(require('./resources/Listeners.vue').default, {
      listeners: {
        change: handler,
      },
    })

    const child = wrapper.find({ name: 'child' })

    expect(child.vm.test).toMatchObject({
      change: expect.any(Function),
    })
  })

  it('InheritAs: passes parent provide, accepts overwrites, adds own properties', () => {
    const wrapper = mount(require('./resources/InheritAsWrapper.vue').default)

    const child = wrapper.find({ name: 'child' })

    expect(child.vm.test).toMatchObject({
      testWrapper: 'Test 123',
      testInheritAs: 'Test InheritAs',
      message: 'InheritAs message',
    })
  })

  it('Reactivity: Changes in Parent propagate and trigger reactive updates in child', () => {
    const wrapper = mount(require('./resources/Reactivity.vue').default)

    const child = wrapper.find({ name: 'child' })

    // before data change
    let msg = 'Testmessage'
    expect(wrapper.vm.test).toMatchObject({
      msg,
      msgComputed: msg.toUpperCase(),
    })

    expect(child.vm.test).toMatchObject({
      msg,
      msgComputed: msg.toUpperCase(),
    })

    // change data
    wrapper.setData({
      msg: 'NewTestmessage',
    })

    // after update
    msg = 'NewTestmessage'
    expect(wrapper.vm.test).toMatchObject({
      msg,
      msgComputed: msg.toUpperCase(),
    })

    expect(child.vm.test).toMatchObject({
      msg,
      msgComputed: msg.toUpperCase(),
    })
  })
})
