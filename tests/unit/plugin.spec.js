import { mount, createLocalVue } from '@vue/test-utils'
import { createGlobalMixin } from '../../src/mixins/GlobalMixin'

const testProd = !!process.env.VUE_APP_TEST_PROD
const DynamicProvide = testProd
  ? require('../../dist/vue-dynamic-provide.common').default
  : require('../../src').default

function mountWithPlugin(component, options) {
  const _Vue = createLocalVue()
  _Vue.use(DynamicProvide)

  return mount(component, {
    ...options,
    localVue: _Vue,
  })
}

describe('The Plugin', () => {
  it('shows Version', () => {
    const pluginVersion = DynamicProvide.version
    const { version } = require('../../package.json')

    expect(pluginVersion).toBe(version)
  })

  it('createGlobalMixin: creates mixin with functional beforeCreate hook', () => {
    const $options = {
      computed: {},
      provide: {},
      inject: {},
      dynamicProvide: {
        name: 'test',
        include: ['msg'],
      },
    }
    const $once = jest.fn().mockName('$once')
    const $on = jest.fn().mockName('$on')
    const VueStub = {
      $options,
      $once,
      $on,
    }

    const mixin = createGlobalMixin()

    expect(mixin).toMatchObject({
      beforeCreate: expect.any(Function),
    })

    mixin.beforeCreate.call(VueStub)
    expect($once).toHaveBeenCalledWith('hook:created', expect.any(Function))
    expect($on).not.toHaveBeenCalled()
    expect($options).toMatchObject({
      computed: {
        test: expect.any(Function),
      },
      dynamicProvide: expect.any(Object),
      provide: expect.any(Function),
    })

    expect($options).toMatchSnapshot()
  })

  it('installs global beforeCreate mixin', () => {
    const mixin = jest.fn()
    const Vue = {
      mixin,
    }

    DynamicProvide.install(Vue)

    expect(mixin).toHaveBeenCalledWith(
      expect.objectContaining({
        beforeCreate: expect.any(Function),
      })
    )
  })

  it('Basic: provides a working injection to a child component', () => {
    const wrapper = mountWithPlugin(
      require('./resources/plugin/Basic.vue').default
    )

    const child = wrapper.find({ name: 'child' })

    expect(child.vm.test).toMatchObject({
      msg: 'Testmessage',
    })
  })

  it('Props/Attrs: provides props & attrs', () => {
    const wrapper = mountWithPlugin(
      require('./resources/plugin/Props.vue').default,
      {
        propsData: {
          name: 'Test',
          msg: 'Hello',
        },
        attrs: {
          title: 'Title',
        },
      }
    )

    const child = wrapper.find({ name: 'child' })

    expect(child.vm.test).toMatchObject({
      name: 'Test',
      msg: 'Hello',
      title: 'Title',
    })
  })

  it('Listeners: provides callbacks', () => {
    const handler = () => {}
    const wrapper = mountWithPlugin(
      require('./resources/plugin/Listeners.vue').default,
      {
        listeners: {
          change: handler,
        },
      }
    )

    const child = wrapper.find({ name: 'child' })

    expect(child.vm.test).toMatchObject({
      change: expect.any(Function),
    })
  })

  it('OptionAsFunction: works when options are defined as a function', () => {
    const wrapper = mountWithPlugin(
      require('./resources/plugin/OptionAsFunction.vue').default,
      {
        propsData: {
          injectName: 'test',
        },
      }
    )

    const child = wrapper.find({ name: 'child' })

    expect(child.vm.test).toMatchObject({
      msg: 'Testmessage',
    })
  })
})
