import Vue from 'vue'
import { pick } from '#lib/utils'
import { warn } from '#lib/utils/warn'

export default function createReactiveProvideMixin({
  name,
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
    inject: inheritAs ? { [inheritAs]: name } : undefined,
    computed: {
      [name]: function() {
        let result
        try {
          result = {
            // first inheritAs from the parent if defined as such
            ...pickIf(inheritAs, this[inheritAs] || {}),
            // then add our own properties
            ...pickIf(props, this.$props),
            ...pickIf(attrs, this.$attrs),
            ...pickIf(include || [], this),
            ...pickIf(listeners, this.$listeners),
          }
        } catch (_) {
          /* istanbul ignore next */
          result = {}
        }
        return result
      },
    },
    watch: {
      [name]: {
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

function pickIf(predicate, obj) {
  if (predicate === true || typeof predicate === 'string') return obj

  if (Array.isArray(predicate)) {
    return pick(obj, predicate)
  }

  if (typeof predicate === 'object') {
    const entries = Object.entries(predicate)
    return entries.reduce((acc, [key, newKey]) => {
      acc[newKey] = obj[key]
      return acc
    }, {})
  }

  return {}
}

function createReactiveObject() {
  return new Vue({
    data: () => ({ obj: {} }),
  }).obj
}
