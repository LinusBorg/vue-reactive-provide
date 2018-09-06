import Vue from 'vue'
import DynamicProvide from './DynamicProvide'

const {
  provide: mergeProvide,
  computed: mergeComputed,
  inject: mergeInject,
} = Vue.config.optionMergeStrategies

export const createGlobalMixin = ({ name = 'dynamicProvide' } = {}) => ({
  beforeCreate() {
    let options = this.$options[name]
    if (!options) return

    if (typeof options === 'function') {
      options = options.call(this)
    }

    /* istanbul ignore next */
    if (typeof options !== 'object') return

    const { beforeCreate, provide, inject, computed, watch } = DynamicProvide(
      options
    )

    // hook
    beforeCreate.call(this, this)
    //merging options
    this.$options.computed = mergeComputed(
      this.$options.computed,
      computed,
      this,
      'computed'
    )
    this.$options.provide = mergeProvide(
      this.$options.provide,
      provide,
      this,
      'provide'
    )
    this.$options.inject = mergeInject(
      this.$options.inject,
      inject,
      this,
      'inject'
    )
    //applying the watch
    this.$once('hook:created', () => {
      const unwatch = this.$watch(
        () => this[options.name],
        watch[options.name].handler,
        {
          immediate: true,
        }
      )
      this.$on('hook:beforeDestroy', unwatch)
    })
  },
})
