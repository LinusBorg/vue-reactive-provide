import Vue from 'vue'

export const createReactiveObject = () => Vue.observable({})

export const pick = (obj, arr = []) => {
  if (Array.isArray(obj) || typeof obj !== 'object') return obj

  let keys = Array.isArray(arr) ? arr : Object.keys(arr)
  const mapping = !Array.isArray(arr)

  return keys.reduce((picked, key) => {
    const newKey = mapping ? arr[key] : key
    picked[newKey] = obj[key]
    return picked
  }, {})
}
