import DynamicProvide from './mixins/DynamicProvide'
import { createGlobalMixin } from './mixins/GlobalMixin'
import { version } from '../package.json'

function install(Vue, options) {
  Vue.mixin(createGlobalMixin(options))
}

export default {
  install,
  version,
}

export { DynamicProvide as DynamicProvideMixin }
