import Vue from 'vue'
import { pick, createReactiveObject } from '#lib/utils'
import { warn } from '#lib/utils/warn'

export default function createReactiveProvideMixin({
  name,
  nameForComputed = null,
  props = false,
  attrs = false,
  listeners = false,
  include = false,
  inheritAs = false,
} = {}) {
  if (!name) {
    warn(
      `[vue-reactive-provide]: No name property found on options object when trying to create mixin.
      the 'name' property is required.`
    )
    return
  }
  let internalDataName = ''
  const computedName = nameForComputed || name
  return {
    beforeCreate() {
      internalDataName = `$_reactiveProvide-${name}-Data`
      this[internalDataName] = createReactiveObject() // just an empty object so far
    },
    provide() {
      return {
        [name]: this[internalDataName],
      }
    },
    inject: inheritAs
      ? { [inheritAs]: { from: name, default: {} } }
      : undefined,
    computed: {
      [computedName]: function() {
        let result = {}
        inheritAs && Object.assign(result, this[inheritAs])

        include && Object.assign(result, pick(this, include))

        props && Object.assign(result, this.$props)

        attrs && Object.assign(result, this.$attrs)

        listeners && Object.assign(result, this.$listeners)

        return result
      },
    },
    watch: {
      [computedName]: {
        immediate: true,
        handler(val = {}) {
          const data = this[internalDataName]
          Object.keys(val).forEach(key => {
            if (data.hasOwnProperty(key)) {
              data[key] = val[key]
            } else {
              Vue.set(data, key, val[key])
            }
          })
        },
      },
    },
  }
}
