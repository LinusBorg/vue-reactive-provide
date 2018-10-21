import ReactiveProvide from './mixins/ReactiveProvide'
import { createGlobalMixin } from './mixins/GlobalMixin'

function install(Vue, options) {
  Vue.mixin(createGlobalMixin(options))
}

export default {
  install,
  version: process.env.VUE_APP_VERSION,
}

export { ReactiveProvide as ReactiveProvideMixin }
